const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ── Mount Routes ───────────────────────────────────────────────────
app.use("/api/stock", require("./routes/stock"));
app.use("/api/stock-ledger", require("./routes/stockLedger"));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start Server ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 CoreInventory backend running on http://localhost:${PORT}`);
});
