/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vehicles').del()
  await knex('vehicles').insert([
    {id: 1, vehicle_name: 'train', tenant_id: 1},
    {id: 2, vehicle_name: 'tram', tenant_id: 1},
    {id: 3, vehicle_name: 'bicycle', tenant_id: 2}
  ]);
};
