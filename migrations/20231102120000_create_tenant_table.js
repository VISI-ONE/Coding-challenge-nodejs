exports.up = function (knex) {
  return knex.schema.createTable('tenant', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
  })
  .then(() => {
    console.log('Migration completed successfully. Tenant Table created.')
  })
  .catch((error) => {
    console.error('Error during migration:', error);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tenant');
};