const db = require("../db");

const getPriceBoards = (req, res) => {
  const tenantId = req.params.tenantId;
  const query = "SELECT * FROM priceboard WHERE tenant_id = ?";

  db.all(query, [tenantId], (err, rows) => {
    if (err) {
      console.error("Error retrieving priceboards:", err);
      res.status(500).json({ error: "Error retrieving priceboards" });
    } else {
      res.status(200).json(rows);
    }
  });
};

const getVehicles = (req, res) => {
  const tenantId = req.params.tenantId;
  const query = "SELECT * FROM vehicle WHERE tenant_id = ?";

  db.all(query, [tenantId], (err, rows) => {
    if (err) {
      console.error("Error retrieving vehicles:", err);
      res.status(500).json({ error: "Error retrieving vehicles" });
    } else {
      res.status(200).json(rows);
    }
  });
}

module.exports = {
  getPriceBoards,
  getVehicles
};
