const { getKnexClient } = require('../../src/database');

function insert(table, rows) {
    return getKnexClient()(table).insert(rows);
}

function select(table, where) {
    return getKnexClient()(table).where(where);
}

function del(table, where) {
    return getKnexClient()(table).where(where).del();
}



module.exports = { insert, select, del };
