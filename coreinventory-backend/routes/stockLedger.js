const express = require('express');
const router = express.Router();
const StockLedgerModel = require('../models/stockLedgerModel');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, async (req, res) => {
  try {
    const { product_id, operation_type, limit } = req.query;
    const entries = await StockLedgerModel.findAll({
      product_id, operation_type, limit: limit ? parseInt(limit) : 100,
    });
    res.json({ success: true, data: entries });
  } catch (e) {
    console.error('Stock ledger error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch stock ledger' });
  }
});

module.exports = router;
