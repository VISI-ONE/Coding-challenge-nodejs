exports.up = function (knex) {
  return knex.schema.createTable('vehicle_priceboard', function (table) {
    table.increments('id').primary();
    table.string('vehicle_id').notNullable();
    table.integer('priceboard_id').notNullable();
    table.foreign('vehicle_id').references('id').inTable('vehicle');
    table.foreign('priceboard_id').references('id').inTable('priceboards');
    table.unique(['vehicle_id', 'priceboard_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('vehicle_priceboard');
};
