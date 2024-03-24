/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("vehicles").del();
  await knex("vehicles").insert([
    { id: 1, vehicle_name: "VolksWagen", tenant_id: 1 },
    { id: 2, vehicle_name: "Audi", tenant_id: 1 },
    { id: 3, vehicle_name: "Bmw", tenant_id: 2 },
    { id: 4, vehicle_name: "Mercedes", tenant_id: 2 },
  ]);
};
