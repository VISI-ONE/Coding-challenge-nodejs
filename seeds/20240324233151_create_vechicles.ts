import { Knex } from "knex";

export async function seed(knex: Knex) {
    // Check if data already exists in the priceboard table
    const existingVehicles = await knex('vehicles').select();

    // If there's no existing data, insert the sample data
    if (existingVehicles.length === 0) {
        await knex('priceboard').insert(
            [
                { id: 1, name: "Mercedes", tenant_id: 1 },
                { id: 2, name: "Porsche", tenant_id: 1 },
                { id: 3, name: "Ferrari", tenant_id: 2 },
                { id: 4, name: "Bugatti", tenant_id: 2 },
            ]
        );
    } else {
        console.log("skipping seeding vehicles - data already exists");
    }
}