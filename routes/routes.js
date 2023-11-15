const express = require('express');
const priceboardService = require('../services/priceboards');
const vehiclesService = require('../services/vehicles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Priceboards
 *     description: Operations related to priceboards
 * 
 * /v1/tenants/{tenantId}/priceboards:
 *   get:
 *     tags:
 *       - Priceboards
 *     summary: Get priceboards by tenantId
 *     description: Retrieve priceboards by tenantId
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tenant
 *     responses:
 *       '200':
 *         description: A list of priceboards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   tenant_id:
 *                     type: integer
 *               example:
 *                 - id: 1
 *                   product_name: Product 1
 *                   price: 10.99
 *                   tenant_id: 1
 *                 - id: 2
 *                   product_name: Product 2
 *                   price: 15.99
 *                   tenant_id: 1
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: string
 */

router.get('/v1/tenants/:tenantId/priceboards', async (req, res) => {
  const tenantId = req.params.tenantId;
  try {
    const priceboards = await priceboardService.getPriceboardsByTenantId(tenantId);
    res.status(200).json(priceboards);
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

/**
 * @swagger
 * tags:
 *   - name: Vehicles
 *     description: Operations related to vehicles
 * 
 * /v1/vehicles:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: List all vehicles
 *     description: Retrieve all vehicles
 *     responses:
 *       '200':
 *         description: A list of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   tenant_id:
 *                     type: integer
 *               example:
 *                 - name: Vehicle 1
 *                   tenant_id: 1
 *                 - name: Vehicle 2
 *                   tenant_id: 2
*       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Error:
 *                   type: string
 */

router.get('/v1/vehicles', async (req, res) => {
  try {
    const vehicles = await vehiclesService.getVehicles();

    res.status(200).json(vehicles);
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

router.post('/pair', async (req, res) => {
  try {
    //** Pairing to be done */
  } catch(err) {
    
  }
});

module.exports = router;