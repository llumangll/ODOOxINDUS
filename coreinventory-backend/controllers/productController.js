const ProductModel = require('../models/productModel');

async function getAll(req, res) {
  try {
    const { search, category, warehouse_id } = req.query;
    const products = await ProductModel.findAll({ search, category, warehouse_id });
    res.json({ success: true, data: products });
  } catch (e) {
    console.error('Product getAll error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
}

async function getById(req, res) {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (e) {
    console.error('Product getById error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
}

async function create(req, res) {
  try {
    const { name, sku, category, unit, stock, reorder_level, warehouse_id } = req.body;
    if (!name || !sku) return res.status(400).json({ success: false, message: 'Name and SKU are required' });
    const product = await ProductModel.create({ name, sku, category, unit, stock, reorder_level, warehouse_id });
    res.status(201).json({ success: true, data: product });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ success: false, message: 'SKU already exists' });
    console.error('Product create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
}

async function update(req, res) {
  try {
    const existing = await ProductModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Product not found' });
    const merged = { ...existing, ...req.body };
    const product = await ProductModel.update(req.params.id, merged);
    res.json({ success: true, data: product });
  } catch (e) {
    console.error('Product update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
}

async function remove(req, res) {
  try {
    await ProductModel.delete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (e) {
    console.error('Product delete error:', e);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
}

async function getStats(req, res) {
  try {
    const stats = await ProductModel.getStats();
    res.json({ success: true, data: stats });
  } catch (e) {
    console.error('Product stats error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await ProductModel.getCategories();
    res.json({ success: true, data: categories });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
}

module.exports = { getAll, getById, create, update, remove, getStats, getCategories };
