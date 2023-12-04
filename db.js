const { Client } = require("pg");

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "bdagenda",
  password: "123456",
  port: 5432,
};

const client = new Client(dbConfig);

async function connectToDatabase() {
  await client.connect();
  console.log("Conectado ao banco de dados");
}

module.exports = {
  query: (text, params) => client.query(text, params),
};
