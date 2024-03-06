const validateTenantId = (req, res, next) => {
  const tenantId = req.params.tenantId;
  if (!tenantId || isNaN(tenantId)) {
    return res.status(400).json({ error: 'Invalid tenant ID' });
  }
  next();
};

module.exports = validateTenantId;
