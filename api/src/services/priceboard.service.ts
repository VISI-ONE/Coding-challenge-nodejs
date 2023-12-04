import { Priceboard } from '@/types/Priceboard';
import { Database } from 'sqlite';
import { VehicleService } from '@/services/vehicle.service';
import { Vehicle } from '@/interfaces';
import { PriceboardServiceError } from '@/errors/PriceboardServiceError';

export class PriceboardService {
  private db: Database;
  private vehicleService: VehicleService;

  constructor(db: Database, vehicleService: VehicleService) {
    this.db = db;
    this.vehicleService = vehicleService;
  }

  async getPriceboards(): Promise<Priceboard[]> {
    try {
      const query = 'SELECT * FROM priceboard';
      return await this.db.all(query);
    } catch (error) {
      throw new PriceboardServiceError('Failed to fetch priceboards.');
    }
  }

  async getPriceboardsWithTenantId(tenantId: string): Promise<Priceboard[]> {
    try {
      const query = 'SELECT * FROM priceboard WHERE tenant_id = ?';
      return await this.db.all(query, [tenantId]);
    } catch (error) {
      throw new PriceboardServiceError('Failed to fetch priceboards for the specified tenant.');
    }
  }

  async getSinglePriceboardWithId(priceboardId: string): Promise<Priceboard | null> {
    try {
      const query = 'SELECT * FROM priceboard WHERE id = ?';
      const priceboards = await this.db.all(query, [priceboardId]);
      return priceboards.length > 0 ? priceboards[0] : null;
    } catch (error) {
      throw new PriceboardServiceError('Failed to fetch the specified priceboard.');
    }
  }

  async pairVehicleWithPriceboard(priceboardId: string, vehicleId: string): Promise<Priceboard> {
    try {
      const vehicle: Vehicle | null = await this.vehicleService.getSingleVehicle(vehicleId);
      const priceboard = await this.getSinglePriceboardWithId(priceboardId);

      if (!vehicle) {
        throw new PriceboardServiceError('Vehicle not found.');
      }

      if (!priceboard) {
        throw new PriceboardServiceError('Priceboard not found.');
      }

      if (vehicle.tenant_id !== priceboard.tenant_id) {
        throw new PriceboardServiceError(
          'Tenant ID mismatch: The vehicle and priceboard belong to different tenants.'
        );
      }

      const insertQuery = 'INSERT INTO vehicle_priceboard (priceboard_id, vehicle_id) VALUES (?, ?)';
      await this.db.run(insertQuery, [priceboardId, vehicle.id]);

      const updatedPriceboard = await this.getSinglePriceboardWithId(priceboardId);
      if (!updatedPriceboard) {
        throw new PriceboardServiceError('Failed to pair vehicle with priceboard.');
      }
      return updatedPriceboard;
    } catch (error) {
      throw new PriceboardServiceError('Failed to pair a vehicle and priceboard.');
    }
  }
}
