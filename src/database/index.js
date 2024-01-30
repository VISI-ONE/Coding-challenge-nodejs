const knex = require('knex');
const knexFile = require('../../knexfile');
const { getConfig } = require('../config');

const config = getConfig();
let _db = null;


function getKnexClient() {
    if (!_db) {
        _db = knex(knexFile[config.NODE_ENV]);
    }
    return _db;
}

module.exports = { getKnexClient };
