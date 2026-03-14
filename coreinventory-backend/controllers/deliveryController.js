const DeliveryModel = require('../models/deliveryModel');

async function getAll(req, res) {
  try {
    const deliveries = await DeliveryModel.findAll();
    res.json({ success: true, data: deliveries });
  } catch (e) {
    console.error('Delivery getAll error:', e);
    res.status(500).json({ success: false, message: 'Failed to fetch deliveries' });
  }
}

async function create(req, res) {
  try {
    const { customer, warehouse_id, notes, items } = req.body;
    if (!customer) return res.status(400).json({ success: false, message: 'Customer is required' });
    const delivery = await DeliveryModel.create({
      customer, warehouse_id, notes, items,
      created_by: req.user?.id || null,
    });
    res.status(201).json({ success: true, data: delivery });
  } catch (e) {
    console.error('Delivery create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create delivery' });
  }
}

async function validate(req, res) {
  try {
    const delivery = await DeliveryModel.findById(req.params.id);
    if (!delivery) return res.status(404).json({ success: false, message: 'Delivery not found' });
    if (delivery.status === 'validated') return res.status(400).json({ success: false, message: 'Already validated' });
    await DeliveryModel.validate(req.params.id, req.user?.id);
    res.json({ success: true, message: 'Delivery validated — stock updated' });
  } catch (e) {
    if (e.message.includes('Insufficient stock')) {
      return res.status(400).json({ success: false, message: e.message });
    }
    console.error('Delivery validate error:', e);
    res.status(500).json({ success: false, message: 'Failed to validate delivery' });
  }
}

module.exports = { getAll, create, validate };
