/* PACKAGES */
const knex = require('knex');

/* DATABASE CONNECTION */
const database = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'boilerplate_db',
    },
    acquireConnectionTimeout: 5000,
    debug: false,
});

database.raw('SELECT version()').then((res) => {
    console.log('[app] Connection with the MySQL database established');
    console.log('[app] MySQL version:', res[0][0]['version()']);
}).catch((err) => {
    console.log('[app] MySQL boot-up error:', err);
    process.exit(1);
});

module.exports = database;
