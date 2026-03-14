const Settings = require('../models/settingsModel');

// ─── PRODUCT SETTINGS ─────────────────────────────────────────
async function getProductSettings(req, res) {
  try {
    const data = await Settings.getProductSettings();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch product settings' }); }
}
async function updateProductSettings(req, res) {
  try {
    const data = await Settings.updateProductSettings(req.body);
    res.json({ success: true, data, message: 'Product settings updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

// ─── CATEGORIES ─────────────────────────────────────────────────
async function getCategories(req, res) {
  try {
    const data = await Settings.getCategories();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch categories' }); }
}
async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const data = await Settings.createCategory(name, description);
    res.status(201).json({ success: true, data });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ success: false, message: 'Category already exists' });
    console.error(e); res.status(500).json({ success: false, message: 'Failed to create category' });
  }
}
async function deleteCategory(req, res) {
  try {
    await Settings.deleteCategory(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to delete' }); }
}

// ─── NOTIFICATION SETTINGS ──────────────────────────────────────
async function getNotificationSettings(req, res) {
  try {
    const data = await Settings.getNotificationSettings();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch' }); }
}
async function updateNotificationSettings(req, res) {
  try {
    const data = await Settings.updateNotificationSettings(req.body);
    res.json({ success: true, data, message: 'Notification settings updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

// ─── ROLES ──────────────────────────────────────────────────────
async function getRoles(req, res) {
  try {
    const data = await Settings.getRoles();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch roles' }); }
}
async function createRole(req, res) {
  try {
    const { role_name } = req.body;
    if (!role_name) return res.status(400).json({ success: false, message: 'Role name required' });
    const data = await Settings.createRole(role_name);
    res.status(201).json({ success: true, data });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ success: false, message: 'Role already exists' });
    console.error(e); res.status(500).json({ success: false, message: 'Failed to create role' });
  }
}
async function updatePermissions(req, res) {
  try {
    await Settings.updatePermissions(req.params.id, req.body);
    res.json({ success: true, message: 'Permissions updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

// ─── DASHBOARD SETTINGS ─────────────────────────────────────────
async function getDashboardSettings(req, res) {
  try {
    const data = await Settings.getDashboardSettings();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch' }); }
}
async function updateDashboardSettings(req, res) {
  try {
    const data = await Settings.updateDashboardSettings(req.body);
    res.json({ success: true, data, message: 'Dashboard settings updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

// ─── INVENTORY CONTROL ──────────────────────────────────────────
async function getInventoryControl(req, res) {
  try {
    const data = await Settings.getInventoryControl();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch' }); }
}
async function updateInventoryControl(req, res) {
  try {
    const data = await Settings.updateInventoryControl(req.body);
    res.json({ success: true, data, message: 'Inventory control updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

// ─── SYSTEM PREFERENCES ─────────────────────────────────────────
async function getSystemPreferences(req, res) {
  try {
    const data = await Settings.getSystemPreferences();
    res.json({ success: true, data });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to fetch' }); }
}
async function updateSystemPreferences(req, res) {
  try {
    const data = await Settings.updateSystemPreferences(req.body);
    res.json({ success: true, data, message: 'System preferences updated' });
  } catch (e) { console.error(e); res.status(500).json({ success: false, message: 'Failed to update' }); }
}

module.exports = {
  getProductSettings, updateProductSettings,
  getCategories, createCategory, deleteCategory,
  getNotificationSettings, updateNotificationSettings,
  getRoles, createRole, updatePermissions,
  getDashboardSettings, updateDashboardSettings,
  getInventoryControl, updateInventoryControl,
  getSystemPreferences, updateSystemPreferences,
};
