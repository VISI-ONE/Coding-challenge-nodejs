
exports.up = function(knex) {
  return knex.schema.createTable('vehicle', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.integer('tenant_id').nullable();
    table.foreign('tenant_id').references('id').inTable('tenant');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicle');
};
