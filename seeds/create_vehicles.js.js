exports.seed = async function(knex) {

  const existingVehicles = await knex('vehicle').select();

  if (existingVehicles.length === 0) {
    return knex('vehicle').insert([
      { name: 'Vehicle A', tenant_id: 1},
      { name: 'Vehicle B', tenant_id: 1},
      { name: 'Vehicle C', tenant_id: 2},
      { name: 'Vehicle D', tenant_id: 2},
    ]);
  }
};
