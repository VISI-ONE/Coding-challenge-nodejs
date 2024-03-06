exports.up = function(knex) {
  return knex.schema.createTable('vehicles', function(table) {
    table.increments('id').primary();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.integer('year').notNullable();
    table.integer('priceboard_id').unsigned().references('id').inTable('priceboards');
    table.integer('tenant_id').unsigned().references('id').inTable('tenants');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vehicles');
};
