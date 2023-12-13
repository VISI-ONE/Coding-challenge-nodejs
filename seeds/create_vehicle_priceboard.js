/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vehicle_priceboard').del()
  await knex('vehicle_priceboard').insert([
     { vehicle_id: 1, priceboard_id: 1 },
  ]);
};
