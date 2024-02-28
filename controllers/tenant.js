const db = require("../db");

const getPriceBoards = (req, res) => {
  console.log("TEST")
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
};

const pairVehicleToPriceboard = (req, res) => {
  const tenantId = req.params.tenantId;
  const { vehicleId, priceboardId } = req.body;
  if (!vehicleId || !priceboardId) {
    res.status(500).json({ error: "Please provide vehicleId and priceboardId" });
  }
  const query = "UPDATE priceboard SET vehicle_id = ? WHERE id = ? AND tenant_id = ?";

  db.all(query, [vehicleId, priceboardId, tenantId], (err) => {
    if (err) {
      console.error("Error pairing vehicle to priceboard:", err);
      res.status(500).json({ error: "Error pairing vehicle to priceboard" });
    } else {
      res.status(200).json({ ok: true });
    }
  });
};

module.exports = {
  getPriceBoards,
  getVehicles,
  pairVehicleToPriceboard,
};
