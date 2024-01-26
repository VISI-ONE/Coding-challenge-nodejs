exports.seed = async function (knex) {
  // Check if data already exists in the vehicles table
  const existingVehicles = await knex('vehicles').select();

  // If there's no existing data, insert the sample data
  if (existingVehicles.length === 0) {
    return knex('vehicles').insert([
      { name: 'VW', tenant_id: 1 },
      { name: 'Opel', tenant_id: 1 },
      { name: 'Wartburg', tenant_id: 2 },
    ]);
  }
};
