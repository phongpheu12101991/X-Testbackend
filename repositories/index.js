const mongo = require("mongodb");

let db = {};

const client = new mongo.MongoClient("mongodb://localhost:27017");

client.connect().then((connectedClient) => {
  console.log("Connected testx");
  const database = connectedClient.db("testx");
  db.user = database.collection("user");
  db.job = database.collection("job");
});

module.exports = db;
