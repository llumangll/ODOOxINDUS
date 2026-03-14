const ReceiptModel = require('../models/receiptModel');

async function getAll(req, res) {
  try {
    const receipts = await ReceiptModel.findAll();
    res.json({ success: true, data: receipts });
  } catch (e) {
    console.error('Receipt getAll error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch receipts' });
  }
}

async function create(req, res) {
  try {
    const { supplier, warehouse_id, notes, items } = req.body;
    if (!supplier) return res.status(400).json({ success: false, message: 'Supplier is required' });
    const receipt = await ReceiptModel.create({
      supplier, warehouse_id, notes, items,
      created_by: req.user?.id || null,
    });
    res.status(201).json({ success: true, data: receipt });
  } catch (e) {
    console.error('Receipt create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create receipt' });
  }
}

async function validate(req, res) {
  try {
    const receipt = await ReceiptModel.findById(req.params.id);
    if (!receipt) return res.status(404).json({ success: false, message: 'Receipt not found' });
    if (receipt.status === 'validated') return res.status(400).json({ success: false, message: 'Already validated' });
    await ReceiptModel.validate(req.params.id, req.user?.id);
    res.json({ success: true, message: 'Receipt validated — stock updated' });
  } catch (e) {
    console.error('Receipt validate error:', e);
    res.status(500).json({ success: false, message: 'Failed to validate receipt' });
  }
}

module.exports = { getAll, create, validate };
