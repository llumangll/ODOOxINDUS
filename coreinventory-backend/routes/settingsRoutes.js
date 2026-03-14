const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/settingsController');
const auth = require('../middleware/authMiddleware');

// Product Settings
router.get('/product', auth, ctrl.getProductSettings);
router.put('/product', auth, ctrl.updateProductSettings);

// Categories
router.get('/categories', auth, ctrl.getCategories);
router.post('/categories', auth, ctrl.createCategory);
router.delete('/categories/:id', auth, ctrl.deleteCategory);

// Notifications
router.get('/notifications', auth, ctrl.getNotificationSettings);
router.put('/notifications', auth, ctrl.updateNotificationSettings);

// Roles & Permissions
router.get('/roles', auth, ctrl.getRoles);
router.post('/roles', auth, ctrl.createRole);
router.put('/roles/:id/permissions', auth, ctrl.updatePermissions);

// Dashboard
router.get('/dashboard', auth, ctrl.getDashboardSettings);
router.put('/dashboard', auth, ctrl.updateDashboardSettings);

// Inventory Control
router.get('/inventory', auth, ctrl.getInventoryControl);
router.put('/inventory', auth, ctrl.updateInventoryControl);

// System Preferences
router.get('/system', auth, ctrl.getSystemPreferences);
router.put('/system', auth, ctrl.updateSystemPreferences);

module.exports = router;
