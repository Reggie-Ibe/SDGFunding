const { createConnection } = require('typeorm');
require('reflect-metadata');

const initializeDB = async () => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "sdgadmin",
    password: "sdgpassword",
    database: "sdgdb",
    entities: [__dirname + "/../models/*.js"],
    synchronize: true,
    logging: false
  });
};

module.exports = { initializeDB };