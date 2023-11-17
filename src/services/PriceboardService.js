const db = require('../database/config/db');

const getById = async (id) => {
  try {
    return await db('priceboard').select('*').where('id', id).first();
  } catch (error) {
    console.error('Error in PriceboardService:', error);
    throw error;
  }
};

const getAll = async () => {
  try {
    return await db('priceboard');
  } catch (error) {
    console.error('Error in PriceboardService:', error);
    throw error;
  }
};

const getAllByTenant = async (tenantId) => {
  try {
    return await db('priceboard').where('tenant_id', tenantId);
  } catch (error) {
    console.error('Error in PriceboardService:', error);
    throw error;
  }
};

module.exports = {
  getAllByTenant,
  getAll,
  getById,
};