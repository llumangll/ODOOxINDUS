const WarehouseModel = require('../models/warehouseModel');

async function getAll(req, res) {
  try {
    const warehouses = await WarehouseModel.findAll();
    res.json({ success: true, data: warehouses });
  } catch (e) {
    console.error('Warehouse getAll error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch warehouses' });
  }
}

async function create(req, res) {
  try {
    const { name, code, location, manager } = req.body;
    if (!name || !code) return res.status(400).json({ success: false, message: 'Name and code are required' });
    const wh = await WarehouseModel.create({ name, code, location, manager });
    res.status(201).json({ success: true, data: wh });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ success: false, message: 'Warehouse code already exists' });
    console.error('Warehouse create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create warehouse' });
  }
}

async function update(req, res) {
  try {
    const wh = await WarehouseModel.update(req.params.id, req.body);
    if (!wh) return res.status(404).json({ success: false, message: 'Warehouse not found' });
    res.json({ success: true, data: wh });
  } catch (e) {
    console.error('Warehouse update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update warehouse' });
  }
}

async function remove(req, res) {
  try {
    await WarehouseModel.delete(req.params.id);
    res.json({ success: true, message: 'Warehouse deleted' });
  } catch (e) {
    console.error('Warehouse delete error:', e);
    res.status(500).json({ success: false, message: 'Failed to delete warehouse' });
  }
}

module.exports = { getAll, create, update, remove };
