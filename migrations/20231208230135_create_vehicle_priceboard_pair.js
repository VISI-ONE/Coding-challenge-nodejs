exports.up = async function (knex) {
  await knex.schema.createTable("vehicle_priceboard_pair", (table) => {
    table.increments("id").primary();
    table.integer("vehicle_id").unsigned();
    table.foreign("vehicle_id").references("vehicle.id");
    table.integer("priceboard_id").unsigned();
    table.foreign("priceboard_id").references("priceboard.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vehicle_priceboard_pair");
};
