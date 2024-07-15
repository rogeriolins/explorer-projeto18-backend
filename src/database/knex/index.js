// npx knex migrate:make createNotes
// npx knex migrate:make createTags
// npx knex migrate:make createlinks
const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development);

module.exports = connection;