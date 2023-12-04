import * as express from 'express';
import * as dotenv from 'dotenv';
import { connectDb } from './db';
import { PriceboardController, VehicleController } from './controllers/';
import { PriceboardService, VehicleService } from './services/';

dotenv.config();

connectDb()
  .then(db => {
    console.log('Database connected');
    const vehicleService = new VehicleService(db);
    const priceboardService = new PriceboardService(db, vehicleService);
    const priceboardController = new PriceboardController(priceboardService);
    const vehicleController = new VehicleController(vehicleService);

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    priceboardController.configureRoutes(app);
    vehicleController.configureRoutes(app);

    const port = process.env.WEBSERVER_PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
