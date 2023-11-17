exports.seed = function (knex) {
  return knex('vehicle_priceboard').del()
    .then(function () {
      return knex('vehicle_priceboard').insert([
        { vehicle_id: 5, priceboard_id: 1 },
      ]);
    });
};
