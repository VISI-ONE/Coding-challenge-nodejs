/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('vehicle').del();

  await knex('vehicle').insert([
    { id: 1, vehicle_name: 'bmw d118', tenant_id: 1 },
    { id: 2, vehicle_name: 'mazda cx-5', tenant_id: 1 },
    { id: 3, vehicle_name: 'polo', tenant_id: 2 }
  ]);
};
