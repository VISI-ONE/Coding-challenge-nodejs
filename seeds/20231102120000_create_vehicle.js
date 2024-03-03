exports.seed = async function (knex) {
  // Check if data already exists in the priceboard table
  const existingVehicles = await knex("vehicle").select();

  // If there's no existing data, insert the sample data
  if (existingVehicles.length === 0) {
    return knex("vehicle").insert([
      { name: "Car 1", tenant_id: 1 },
      { name: "Car 2", tenant_id: 1 },
      { name: "Car 3", tenant_id: 2 },
      { name: "Car 4", tenant_id: 2 },
    ]);
  }
};
