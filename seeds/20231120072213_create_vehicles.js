exports.seed = async function(knex) {
  await knex('vehicles').del()
  await knex('vehicles').insert([
    {id: 1, vehicle_name: 'ford', tenant_id: 1},
    {id: 2, vehicle_name: 'ferrari', tenant_id: 1},
    {id: 3, vehicle_name: 'tesla', tenant_id: 2},
    {id: 4, vehicle_name: 'volvo', tenant_id: 1},
  ]);
};

