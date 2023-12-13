/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vehicle').del()
  await knex('vehicle').insert([
    { vehicle_name: 'Honda W', tenant_id: 1 },
    { vehicle_name: 'Audi X', tenant_id: 1 },
    { vehicle_name: 'BMW Y', tenant_id: 2 },
    { vehicle_name: 'Toyota Z', tenant_id: 2 },
  ]);
};
