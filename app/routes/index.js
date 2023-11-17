const router = require('express').Router();

router.get('/tenant/:tenantId/priceboards', require('../controllers/priceboard'))
router.get('/vehicle', require('../controllers/vehicle'))
  
//  404
router.use((req, res) => {
  res.status(404);

  res.json({ error: 'Not found' });
  return;
});

module.exports = router;
