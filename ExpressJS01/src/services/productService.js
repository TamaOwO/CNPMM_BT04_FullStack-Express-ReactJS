const Product = require('../models/product');
const esClient = require( '../config/elasticsearch');

async function getProducts({ category, page = 1, limit = 16 }) {
  const skip = (Math.max(1, page) - 1) * limit;
  const filter = {};
  if (category && category !== 'all') filter.category = category;

  const [items, totalItems] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Product.countDocuments(filter)
  ]);

  return {
    items,
    totalItems
  };
}

async function indexProduct(product) {
  await esClient.index({
    index: "products",
    id: product._id.toString(),
    body: {
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.image
    },
  });
}

module.exports = { getProducts, indexProduct };