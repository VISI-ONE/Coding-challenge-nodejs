exports.seed = async function (knex) {
  const existingVehicles = await knex('vehicle').select();
  if (existingVehicles.length === 0) {
    return knex('vehicle').insert([
      { id: 'V1', name: 'Excellent Cabrio', make: 'BMW', model: 'Cabrio', tenant_id: 1 },
      { id: 'V2', name: 'Great Card', make: 'Audi', model: 'TT', tenant_id: 1 },
    ]);
  }
};
