const priceboardService = require("../services/priceBoardService");

exports.getPriceboardsByTenant = async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const priceboards = await priceboardService.getPriceboardsByTenant(
      tenantId
    );
    res.status(200).json(priceboards);
  } catch (error) {
    next(error);
  }
};
