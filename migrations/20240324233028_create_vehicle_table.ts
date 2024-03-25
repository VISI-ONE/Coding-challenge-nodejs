import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('vehicle', (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();

        table.integer("tenant_id").unsigned();
        table.foreign("tenant_id").references("tenant.id").onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("vehicles");
}

