exports.up = function (knex) {
    return knex.schema.createTable('priceboard_vehicle', (table) => {
      table.increments('id').primary();
      table.integer('priceboard_id').notNullable();
      table.string('vehicle_id').notNullable();
      table.foreign('priceboard_id').references('id').inTable('priceboards').onDelete('CASCADE');
      table.foreign('vehicle_id').references('id').inTable('vehicles').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('priceboard_vehicle');
  };