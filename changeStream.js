const MongoClient = require("mongodb").MongoClient;

// Not this file
console.log(process.env["MONGO_URL"]);
if (process.env["MONGO_URL"] != "mongodb://127.0.0.1:3001/meteor") {
  console.log("CONNECTING TO EXTERNAL MONGO DB");
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client
    .connect()
    .then(db => {
      const changeStream = client
        .db("piratehub")
        .collection("Files")
        .watch({ fullDocument: "updateLookup" });
      console.log("WATCHING CHANGE STREAM");
      changeStream.on("change", next => {
        console.log(`DUDE!! ${next}`);
        console.log("WOOOOOOOOOOOOOOOOT");
      });
    })
    .catch(e => {
      console.log(`MONGODB ERROR: ${e}`);
    });
} else {
  console.log("CONNECTING TO MINI_MONGO");
}
