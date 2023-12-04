import { Request, Response } from 'express';
import { VehicleService } from '@/services/vehicle.service';
import { Express } from 'express';
import { Vehicle } from '@/interfaces/Vehicle';

export class VehicleController {
  private service: VehicleService;

  constructor(service: VehicleService) {
    this.service = service;
  }

  public configureRoutes(app: Express): void {
    app.get('/vehicles/', this.getVehicles);
  }

  public getVehicles = async (req: Request, res: Response): Promise<void> => {
    try {
      const vehicles: Array<Vehicle> = await this.service.getVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
