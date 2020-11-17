const {MongoClient} = require('mongodb');

const connectionUrl = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

let db;

const connect = () =>
  MongoClient.connect(connectionUrl, {useUnifiedTopology: true}).then(client => {
    db = client.db(dbName);
});

const getConnection = () => db;

module.exports = {connect, getConnection};
