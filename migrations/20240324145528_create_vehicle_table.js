/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("vehicles", (table) => {
    table.increments("id").primary();
    table.string("vehicle_name").notNullable();
    table.integer("tenant_id").unsigned();
    table.foreign("tenant_id").references("tenant.id").onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("vehicles");
}
