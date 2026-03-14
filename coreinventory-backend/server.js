require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/envConfig');

// Import routes
const authRoutes = require('./routes/authRoutes');
const warehouseRoutes = require('./routes/warehouses');
const productRoutes = require('./routes/products');
const receiptRoutes = require('./routes/receipts');
const deliveryRoutes = require('./routes/deliveries');
const transferRoutes = require('./routes/transfers');
const adjustmentRoutes = require('./routes/adjustments');
const stockLedgerRoutes = require('./routes/stockLedger');
const settingsRoutes = require('./routes/settingsRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardController = require('./controllers/dashboardController');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// ─── Global Middleware ──────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CoreInventory Backend is running!',
    data: { timestamp: new Date().toISOString() },
  });
});

// ─── Public Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ─── Protected Routes ───────────────────────────────────────────
app.use('/api/users', userRoutes);
app.get('/api/dashboard', authMiddleware, dashboardController.getDashboard);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/products', productRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/stock-ledger', stockLedgerRoutes);
app.use('/api/settings', settingsRoutes);

// ─── 404 Handler ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ─── Start Server ───────────────────────────────────────────────
app.listen(config.PORT, () => {
  console.log(`\n🚀 CoreInventory Backend running on http://localhost:${config.PORT}`);
  console.log(`📋 Health:      http://localhost:${config.PORT}/api/health`);
  console.log(`🔐 Auth:        http://localhost:${config.PORT}/api/auth/login`);
  console.log(`📊 Dashboard:   http://localhost:${config.PORT}/api/dashboard`);
  console.log(`📦 Products:    http://localhost:${config.PORT}/api/products`);
  console.log(`🏭 Warehouses:  http://localhost:${config.PORT}/api/warehouses`);
  console.log(`📥 Receipts:    http://localhost:${config.PORT}/api/receipts`);
  console.log(`📤 Deliveries:  http://localhost:${config.PORT}/api/deliveries`);
  console.log(`🔄 Transfers:   http://localhost:${config.PORT}/api/transfers`);
  console.log(`📝 Adjustments: http://localhost:${config.PORT}/api/adjustments`);
  console.log(`📒 Ledger:      http://localhost:${config.PORT}/api/stock-ledger\n`);
});
