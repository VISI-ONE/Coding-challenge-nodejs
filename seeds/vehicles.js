exports.seed = async function(knex) {
   const existingVehicles = await knex('vehicles').select();
  
   if (existingVehicles.length === 0) {
    return knex('vehicles').insert([
      { make: 'Toyota', model: 'Camry', year: 2020, tenant_id: 1 },
      { make: 'Honda', model: 'Accord', year: 2019, tenant_id: 2 },
      { make: 'Ford', model: 'F-150', year: 2018, tenant_id: 1 },
    ]);
  }
};
