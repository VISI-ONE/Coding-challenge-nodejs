const knexfile = require("../../knexfile.js");

import { knex } from "knex";

const knexInstance = knex(knexfile[process.env.NODE_ENV as string]);

export default knexInstance;
