const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/adjustmentController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, ctrl.create);

module.exports = router;
