/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('vehicle').del();

  await knex('vehicle').insert([
    { vehicle_name: 'Sedan', tenant_id: 1 },
    { vehicle_name: 'Truck', tenant_id: 1 },
    { vehicle_name: 'SUV', tenant_id: 2 },
    { vehicle_name: 'Motorcycle', tenant_id: 2 },
  ]);
};
