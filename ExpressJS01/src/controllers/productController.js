const { getProducts } = require('../services/productService');
const esClient = require( '../config/elasticsearch');
const Product = require('../models/product');
const { indexProduct } = require('../services/productService');

async function productController(req, res) {
    await esClient.indices.delete({ index: 'products' }, { ignore: [404] });
    const products = await Product.find();
    for (const p of products) {
        await indexProduct(p);
    }
    const { category, page = 1, limit = 16 } = req.query;
    const pageNumber = Math.max (1, parseInt(page, 10   ) || 1 );
    const limitNumber = Math.max (1, parseInt(limit, 10) || 16 );

    const { items, totalItems } = await getProducts({category, page: pageNumber, limit: limitNumber});

    res.json({
        product: items,
        page: pageNumber,
        limit: limitNumber,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNumber)
    });
}

async function reindexAllProducts(req, res) {
  try {
    const products = await Product.find();
    for (const p of products) {
      await indexProduct(p);
    }
    res.json({ message: "Reindexed all products into Elasticsearch" });
  } catch (err) {
    console.error("Reindex error", err);
    res.status(500).json({ message: "Reindex failed" });
  }
}

async function searchProducts(req, res) {
    try {
        const { keyword, category, minPrice, maxPrice } = req.query;

        const mustQuery = [];

        // Fuzzy Search theo tên
        if (keyword) {
            mustQuery.push({
                match: {
                    title: {
                        query: keyword,
                        fuzziness: "AUTO"
                    }
                }
            });
        }

        // Lọc theo danh mục
        if (category && category !== 'all') {
            mustQuery.push({
                match: { category }
            });
        }

        // Lọc theo khoảng giá
        if (minPrice || maxPrice) {
            const range = {};
            if (minPrice) range.gte = parseFloat(minPrice);
            if (maxPrice) range.lte = parseFloat(maxPrice);
            mustQuery.push({ range: { price: range } });
        }

        // Nếu không có filter nào -> lấy tất cả
        const queryBody = mustQuery.length > 0
            ? { bool: { must: mustQuery } }
            : { match_all: {} };

        const result = await esClient.search({
            index: "products",
            body: {
                query: {
                    bool: {
                        must: queryBody
                    }
                }
            }
        });

        const products = result.hits.hits.map(hit => ({
            id: hit._id,
            ...hit._source
        }));

        res.json(products);
    } catch (err) {
        console.error('searchProducts error', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    productController,
    reindexAllProducts,
    searchProducts,
};