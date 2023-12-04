import { Vehicle } from '@/interfaces/Vehicle';
import { Database } from 'sqlite';

export class VehicleService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getVehicles = async (): Promise<Vehicle[]> => {
    const query = 'SELECT * FROM vehicle';
    return this.db.all(query);
  };

  getSingleVehicle = async (vehicleId: string): Promise<Vehicle | null> => {
    const query = 'SELECT * FROM vehicle WHERE id = ?';
    const vehicles = await this.db.all(query, [vehicleId]);
    if (vehicles.length > 0) {
      return vehicles[0];
    } else {
      return null;
    }
  };
}
