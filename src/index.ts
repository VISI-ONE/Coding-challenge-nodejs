import express from 'express';
import tenantRoutes from './routes/tenantRoutes';
import vehicleRoutes from './routes/vehicleRoutes';

const app = express();
app.use(express.json());

app.use('/tenant', tenantRoutes);
app.use('/vehicles', vehicleRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));