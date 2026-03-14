const ProductModel = require('../models/productModel');
const ReceiptModel = require('../models/receiptModel');
const DeliveryModel = require('../models/deliveryModel');
const TransferModel = require('../models/transferModel');
const StockLedgerModel = require('../models/stockLedgerModel');

async function getDashboard(req, res) {
  try {
    const [productStats, pendingReceipts, pendingDeliveries, pendingTransfers, recentActivity] = await Promise.all([
      ProductModel.getStats(),
      ReceiptModel.getPendingCount(),
      DeliveryModel.getPendingCount(),
      TransferModel.getPendingCount(),
      StockLedgerModel.getRecentActivity(10),
    ]);

    res.json({
      success: true,
      data: {
        kpis: {
          totalProducts: productStats.total,
          lowStock: productStats.low_stock,
          outOfStock: productStats.out_of_stock,
          pendingReceipts,
          pendingDeliveries,
          pendingTransfers,
        },
        recentActivity,
      },
    });
  } catch (e) {
    console.error('Dashboard error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
}

module.exports = { getDashboard };
