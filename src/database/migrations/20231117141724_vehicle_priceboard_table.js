exports.up = function (knex) {
    return knex.schema.createTable('vehicle_priceboard', (table) => {
      table.increments('id').primary();
      table.integer('vehicle_id').unsigned();
      table.foreign('vehicle_id').references('vehicle.id').onDelete('CASCADE');
      table.integer('priceboard_id').unsigned();
      table.foreign('priceboard_id').references('priceboard.id').onDelete('CASCADE');
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable('vehicle_priceboard');
};
  