const db = require("../db");
const priceboard = db.priceboard;

const getPriceBoards = (req, res) => {
  const tenantId = req.params.tenantId;
  const query = "SELECT * FROM priceboard WHERE tenant_id = ?";

  priceboard.all(query, [tenantId], (err, rows) => {
    if (err) {
      console.error("Error retrieving priceboards:", err);
      res.status(500).json({ error: "Error retrieving priceboards" });
    } else {
      res.status(200).json(rows);
    }
  });
};

module.exports = {
  getPriceBoards,
};
