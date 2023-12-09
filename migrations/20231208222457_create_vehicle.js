exports.up = async function (knex) {
  await knex.schema.createTable("vehicle", (table) => {
    table.increments("id").primary();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.integer("year").notNullable();
    table.string("color");
    table.string("license_plate").unique();
    table.decimal("mileage", 10, 2);
    table.integer("tenant_id").unsigned().notNullable();
    table.foreign("tenant_id").references("tenant.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vehicle");
};
