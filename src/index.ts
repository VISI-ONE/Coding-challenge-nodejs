import express from 'express';
import tenantRoutes from './routes/tenantRoutes';

const app = express();
app.use(express.json());

app.use(tenantRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));