exports.seed = async function (knex) {
  // Check if data already exists in the priceboard table
  const existingVehicles = await knex("vehicle").select();

  // If there's no existing data, insert the sample data
  if (existingVehicles.length === 0) {
    return knex("vehicle").insert([
      { name: "Vehicle 1", price: 200.59, year: 1993, tenant_id: 1 },
      { name: "Vehicle 2", price: 300.99, year: 1996, tenant_id: 1 },
      { name: "Vehicle 3", price: 300.99, year: 2012, tenant_id: 1 },
      { name: "Vehicle 4", price: 350.49, year: 2022, tenant_id: 2 },
      { name: "Vehicle 5", price: 500.99, year: 1997, tenant_id: 2 },
      { name: "Vehicle 6", price: 1000.99, year: 1989, tenant_id: 2 },
    ]);
  }
};
