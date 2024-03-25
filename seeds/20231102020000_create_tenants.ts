import { Knex } from "knex";

exports.seed = async function (knex: Knex) {
  // Check if data already exists in the tenant table
  const existingTenants = await knex('tenant').select();

  // If there's no existing data, insert the sample data
  if (existingTenants.length === 0) {
    return knex('tenant').insert([
      { id: 1, name: 'Tenant A' },
      { id: 2, name: 'Tenant B' },
    ]);
  } else {
    console.log("skipping seeding tenants - data already exists");
  }
};