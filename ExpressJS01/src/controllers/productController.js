const { getProducts } = require('../services/productService');

async function productController(req, res) {
    const { category, page = 1, limit = 16 } = req.query;
    const pageNumber = Math.max (1, parseInt(page, 10   ) || 1 );
    const limitNumber = Math.max (1, parseInt(limit, 10) || 16 );

    const { items, totalItems } = await getProducts({category, page: pageNumber, limit: limitNumber});

    res.json({
        product: itesm,
        page: pageNumber,
        limit: limitNumber,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNumber)
    });
}
module.exports = {
    productController
};