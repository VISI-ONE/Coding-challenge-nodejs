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
 * /v1/priceboards:
 *   get:
 *     tags:
 *       - Priceboards
 *     summary: Get list of priceboards
 *     description: Retrieve priceboards
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

router.get('/v1/priceboards', async (req, res) => {
  try {
    const priceboards = await priceboardService.getPriceboards();
    res.status(200).json(priceboards);
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

/**
 * @swagger
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

/**
 * @swagger
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
 *   - name: Pair
 *     description: Operations related to vehicle paring
 * 
 * /v1/pair:
 *   post:
 *     tags:
 *       - Pair
 *     summary: Pair a vehicle
 *     description: Paring of a vehicle with a priceboard
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                vehicle_name:
 *                  type: string
 *                priceboardId:
 *                  type: integer
 *              required:
 *                - vehicle_name
 *                - priceboard
 *     responses:
 *       '201':
 *         description: Pairing successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pairing:
 *                   type: object
 *                   properties:
 *                     vehicle_name:
 *                       type: string
 *                     priceboardId:
 *                       type: integer
 *               example:
 *                 message: Pairing successful
 *                 pairing:
 *                   vehicle_name: Vehicle 1
 *                   priceboardId: 1
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

router.post('/v1/pair', async (req, res) => {
  const { vehicle_name, priceboardId } = req.body;

  try {
    const vehicles = await vehiclesService.getVehicles();
    const priceboards = await priceboardService.getPriceboards();
    
    const vehicle = vehicles.find(v => v.name === vehicle_name);
    const priceboard = priceboards.find(p => p.id === priceboardId);

    if (!vehicle || !priceboard || vehicle.tenant_id !== priceboard.tenant_id) {
      return res.status(400).json({message: 'Invalid pairing. Vehicle and priceboard must belong to the same tenant.'})
    }
    
    const pairing = { vehicle_name, priceboardId };
    res.status(201).json({ message: 'Pairing successful.', pairing });
  } catch(err) {
    res.status(500).json({"Error": err.message});
  }
});

module.exports = router;