exports.up = function (knex) {
  return knex.schema.createTable('priceboard', (table) => {
    table.increments('id').primary();
    table.string('product_name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('tenant_id').unsigned();
    table.foreign('tenant_id').references('tenant.id').onDelete('CASCADE');
    table.integer('vehicle_id').unsigned().nullable();
    table.foreign('vehicle_id').references('vehicle.id').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('priceboard');
};
