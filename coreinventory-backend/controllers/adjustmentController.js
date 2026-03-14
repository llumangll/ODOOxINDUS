const ProductModel = require('../models/productModel');
const StockLedgerModel = require('../models/stockLedgerModel');

async function create(req, res) {
  try {
    const { product_id, warehouse_id, counted_quantity, notes } = req.body;
    if (!product_id || counted_quantity === undefined) {
      return res.status(400).json({ success: false, message: 'product_id and counted_quantity are required' });
    }

    // Get current stock
    const product = await ProductModel.findById(product_id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const difference = counted_quantity - product.stock;

    // Update product stock to counted quantity
    await ProductModel.updateStock(product_id, difference);

    // Log to stock ledger
    await StockLedgerModel.create({
      product_id,
      operation_type: 'adjustment',
      quantity: difference,
      reference: notes || `ADJ-${Date.now().toString(36).toUpperCase()}`,
      warehouse_id: warehouse_id || product.warehouse_id,
      user_id: req.user?.id || null,
    });

    res.json({
      success: true,
      message: `Stock adjusted by ${difference > 0 ? '+' : ''}${difference}`,
      data: { previous_stock: product.stock, new_stock: counted_quantity, difference },
    });
  } catch (e) {
    console.error('Adjustment error:', e);
    res.status(500).json({ success: false, message: 'Failed to create adjustment' });
  }
}

module.exports = { create };
