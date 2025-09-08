const Product = require('../models/product');

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

module.exports = { getProductsPaginated };