const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deliveryController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, ctrl.getAll);
router.post('/', auth, ctrl.create);
router.put('/:id/validate', auth, ctrl.validate);

module.exports = router;
