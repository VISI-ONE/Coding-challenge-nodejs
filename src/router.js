const Router = require('express/lib/router');
const tenantRouter = require('./components/tenant/router');
const router = Router();

router.use('/tenant', tenantRouter);

module.exports = router;
