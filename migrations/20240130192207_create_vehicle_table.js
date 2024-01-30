/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('vehicle', (table) => {
        table.increments('id').primary();
        table.string('vehicle_name').notNullable();
        table.integer('tenant_id').unsigned();
        table.integer('priceboard_id').unsigned();
        table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
        table.foreign('priceboard_id').references('priceboard.id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('vehicle');
};
