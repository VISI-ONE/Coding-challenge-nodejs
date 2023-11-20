/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  const existingVehicles = await knex('vehicle').select();

  if (existingVehicles.length === 0) {
    return knex('vehicle').insert([
      { name: 'Vehicle 1', tenant_id: 1 },
      { name: 'Vehicle 2', tenant_id: 1 },
      { name: 'Vehicle 3', tenant_id: 2 },
      { name: 'Vehicle 4', tenant_id: 2 },
    ]);
  }
};
