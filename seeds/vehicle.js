exports.seed = async function (knex) {
  // Check if data already exists in the tenant table
  const vehicle = await knex("vehicle").select();

  // If there's no existing data, insert the sample data
  if (vehicle.length === 0) {
    return knex("vehicle").insert([
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
        color: "Silver",
        license_plate: "ABC123",
        mileage: 25000.5,
        tenant_id: 1
      },
      {
        make: "Ford",
        model: "Focus",
        year: 2018,
        color: "Green",
        tenant_id: 1
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2019,
        license_plate: "XYZ789",
        mileage: 30000.75,
        color: "Pink",
        tenant_id: 2
      },
      {
        make: "Chevrolet",
        model: "Malibu",
        year: 2017,
        license_plate: "DEF456",
        color: "Red",
        tenant_id: 2
      },
      {
        make: "BMW",
        model: "X5",
        year: 2022,
        color: "Black",
        license_plate: "GHI789",
        mileage: 15000.25,
        tenant_id: 3
      },
    ]);
  }
};
