const express = require("express");
const router = express.Router();

// In-memory move history data
let nextId = 9;
const ledgerData = [
  { id: 1, reference: "WH/IN/0001",  date: "12/1/2001", contact: "Azure Interior",   from: "Vendor",    to: "WH/Stock1", quantity: 50,  status: "Ready",   type: "IN"  },
  { id: 2, reference: "WH/OUT/0002", date: "12/1/2001", contact: "Azure Interior",   from: "WH/Stock1", to: "Vendor",    quantity: 30,  status: "Ready",   type: "OUT" },
  { id: 3, reference: "WH/OUT/0002", date: "12/1/2001", contact: "Azure Interior",   from: "WH/Stock2", to: "Vendor",    quantity: 20,  status: "Ready",   type: "OUT" },
  { id: 4, reference: "WH/IN/0003",  date: "15/1/2001", contact: "Deco Addict",      from: "Vendor",    to: "WH/Stock1", quantity: 100, status: "Done",    type: "IN"  },
  { id: 5, reference: "WH/IN/0004",  date: "18/1/2001", contact: "Gemini Furniture", from: "Vendor",    to: "WH/Stock2", quantity: 75,  status: "Done",    type: "IN"  },
  { id: 6, reference: "WH/OUT/0005", date: "20/1/2001", contact: "Azure Interior",   from: "WH/Stock1", to: "Customer",  quantity: 15,  status: "Waiting", type: "OUT" },
  { id: 7, reference: "WH/IN/0006",  date: "22/1/2001", contact: "Ready Mat",        from: "Vendor",    to: "WH/Stock1", quantity: 200, status: "Draft",   type: "IN"  },
  { id: 8, reference: "WH/OUT/0007", date: "25/1/2001", contact: "Lumber Inc",       from: "WH/Stock2", to: "Customer",  quantity: 40,  status: "Done",    type: "OUT" },
];

// GET /api/stock-ledger — list all move records, with optional ?search= filter
router.get("/", (req, res) => {
  const { search } = req.query;

  let result = ledgerData;
  if (search) {
    const q = search.toLowerCase();
    result = ledgerData.filter(
      (m) =>
        m.reference.toLowerCase().includes(q) ||
        m.contact.toLowerCase().includes(q)
    );
  }

  res.json(result);
});

// POST /api/stock-ledger — create a new move record
router.post("/", (req, res) => {
  const { reference, date, contact, from, to, quantity, status, type } = req.body;

  if (!reference || !contact || !from || !to) {
    return res.status(400).json({ error: "Missing required fields: reference, contact, from, to" });
  }

  const today = new Date();
  const newRecord = {
    id: nextId++,
    reference,
    date: date || `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    contact,
    from,
    to,
    quantity: quantity || 0,
    status: status || "Draft",
    type: type || "IN",
  };

  ledgerData.push(newRecord);
  res.status(201).json(newRecord);
});

module.exports = router;
