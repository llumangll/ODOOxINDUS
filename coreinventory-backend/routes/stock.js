const express = require("express");
const router = express.Router();

// In-memory stock data
const stockData = [
  { id: 1, product: "Desk",     perUnitCost: 3000,  onHand: 50,  freeToUse: 45  },
  { id: 2, product: "Table",    perUnitCost: 3000,  onHand: 50,  freeToUse: 50  },
  { id: 3, product: "Chair",    perUnitCost: 1500,  onHand: 120, freeToUse: 110 },
  { id: 4, product: "Monitor",  perUnitCost: 12000, onHand: 30,  freeToUse: 28  },
  { id: 5, product: "Keyboard", perUnitCost: 800,   onHand: 200, freeToUse: 195 },
];

// GET /api/stock — list all stock items, with optional ?search= filter
router.get("/", (req, res) => {
  const { search } = req.query;

  let result = stockData;
  if (search) {
    const q = search.toLowerCase();
    result = stockData.filter((s) => s.product.toLowerCase().includes(q));
  }

  res.json(result);
});

module.exports = router;
