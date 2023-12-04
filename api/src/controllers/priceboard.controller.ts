import express, { Request, Response } from 'express';
import { PriceboardService } from '@/services/priceboard.service';
import { Priceboard } from '@/types/Priceboard';

export class PriceboardController {
  private service: PriceboardService;

  constructor(service: PriceboardService) {
    this.service = service;
  }

  public configureRoutes(app: express.Application): void {
    app.get('/priceboards', this.getPriceboards);
    app.get('/priceboards/:tenantId', this.getPriceboardsWithTenantId);
    app.post('/priceboards/pair-vehicle/:priceboardId/:vehicleId', this.pairVehicleWithPriceboard);
  }

  // Fetch all priceboards
  public getPriceboards = async (req: Request, res: Response): Promise<void> => {
    try {
      const priceboards: Array<Priceboard> = await this.service.getPriceboards();
      res.status(200).json(priceboards);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving priceboards.' });
    }
  };

  // Fetch priceboards for a specific tenant
  public getPriceboardsWithTenantId = async (req: Request, res: Response): Promise<void> => {
    try {
      const tenantId = req.params.tenantId;
      if (!tenantId) {
        return res.status(400).json({ message: 'Tenant ID is required' });
      }

      const priceboards = await this.service.getPriceboardsWithTenantId(tenantId);
      res.status(200).json(priceboards);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving priceboard with tenant id.' });
    }
  };

  // Pair a vehicle with a priceboard
  public pairVehicleWithPriceboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const priceboardId = req.params.priceboardId;
      const vehicleId = req.params.vehicleId;

      if (!priceboardId || !vehicleId) {
        return res.status(400).json({ message: 'Priceboard ID and Vehicle ID are required' });
      }

      await this.service.pairVehicleWithPriceboard(priceboardId, vehicleId);
      res.status(200).json({ message: 'Vehicle successfully paired with priceboard' });
    } catch (error) {
      res.status(500).json({ message: 'Error pairing vehicle with priceboard' });
    }
  };
}
