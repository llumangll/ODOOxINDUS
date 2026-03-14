const TransferModel = require('../models/transferModel');

async function getAll(req, res) {
  try {
    const transfers = await TransferModel.findAll();
    res.json({ success: true, data: transfers });
  } catch (e) {
    console.error('Transfer getAll error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch transfers' });
  }
}

async function create(req, res) {
  try {
    const { from_warehouse_id, to_warehouse_id, product_id, quantity, notes } = req.body;
    if (!from_warehouse_id || !to_warehouse_id || !product_id || !quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const transfer = await TransferModel.create({
      from_warehouse_id, to_warehouse_id, product_id, quantity, notes,
      created_by: req.user?.id || null,
    });
    res.status(201).json({ success: true, data: transfer });
  } catch (e) {
    console.error('Transfer create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create transfer' });
  }
}

async function validate(req, res) {
  try {
    await TransferModel.validate(req.params.id, req.user?.id);
    res.json({ success: true, message: 'Transfer validated — stock moved' });
  } catch (e) {
    if (e.message.includes('Insufficient')) return res.status(400).json({ success: false, message: e.message });
    console.error('Transfer validate error:', e);
    res.status(500).json({ success: false, message: 'Failed to validate transfer' });
  }
}

module.exports = { getAll, create, validate };
