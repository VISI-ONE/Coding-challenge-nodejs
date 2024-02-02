/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const existingVehicles = await knex('vehicles').select();
  if (existingVehicles.length === 0) {
    await knex('vehicles').insert([
      { brand: 'BMW', model: 'X1', year: 2023, tenant_id: 1 },
      { brand: 'BMW', model: 'X6', year: 2022, tenant_id: 1 },
      { brand: 'BMW', model: 'X3', year: 2023, tenant_id: 2 },

    ]);
  }
};
