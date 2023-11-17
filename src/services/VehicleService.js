const db = require('../database/config/db');

const getAllByTenant = async (tenantId) => {
  try {
    return await db('vehicle').where('tenant_id', tenantId);
  } catch (error) {
    console.error('Error in VehicleService:', error);
    throw error;
  }
};

const getAll = async () => {
  try {
    return await db('vehicle');
  } catch (error) {
    console.error('Error in VehicleService:', error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await db('vehicle').select('*').where('id', id).first();
  } catch (error) {
    console.error('Error in VehicleService:', error);
    throw error;
  }
};

module.exports = {
  getAllByTenant,
  getAll,
  getById,
};
