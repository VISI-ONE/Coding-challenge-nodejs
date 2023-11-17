exports.seed = async function (knex) {
  // Check if data already exists in the tenant table
  const existingTenants = await knex('tenant').select();

  // If there's no existing data, insert the sample data
  if (existingTenants.length === 0) {
    return knex('tenant').insert([
      { name: 'Tenant A' },
      { name: 'Tenant B' },
    ]);
  }
};