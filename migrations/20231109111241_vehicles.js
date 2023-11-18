/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('vehicle', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('tenant_id').unsigned();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
  })
  .then(() => {
    console.log('Migration completed successfully. Vehicle Table created.')
  })
  .catch((error) => {
    console.error('Error during migration:', error);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('vehicle');
};
