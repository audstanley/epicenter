import { hostname } from "os";
const createTorrent = require("create-torrent");
const fs = require("fs");
const Transmission = require("transmission");
const transmission = new Transmission({
  host: "localhost", // default 'localhost'
  port: 9091, // default 9091
  ssl: false, // default false use https
  url: "/transmission/rpc" // default '/transmission/rpc'
});
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URL;
const computerHostname = hostname();
const dbName = "piratehub";
const collectionName = "torrents";

// This function will take a filepath, and return an object of the b64 string of the binary file
// as well as the filename.
function createTorrentFromFileName(filename, storagepath) {
  return new Promise((resolve, reject) => {
    let fPath = `${process.cwd()}/${filename}`;
    let sPath = `${process.cwd()}/${storagepath}`;
    console.log(`CREATE_TORRENT FROM FILENAME: ${fPath}`);

    createTorrent(fPath, (err, tor) => {
      if (err) reject(err);
      else {
        if (uri != undefined && filename != undefined) {
          MongoClient.connect(uri, function(err, client) {
            const col = client.db(dbName).collection(collectionName);
            col.insertOne({
              tor: tor,
              b64: `${tor.toString("base64")}`,
              filename: filename,
              hostname: computerHostname
            });
          });
        }

        resolve({
          name: fPath,
          b64: `${tor.toString("base64")}`,
          tor: tor,
          storagePath: sPath
        });
      }
    });
  });
}

// takes and obj.tor Buffer, and saves it to the ./uploads directory in the project folder
function saveFileToTorrentFolder(obj) {
  return new Promise((resolve, reject) => {
    if (!(obj.name && obj.tor))
      reject("saveFileToTransmissionError: { name: string, tor: Buffer}");
    else {
      fs.writeFile(`${obj.name}.torrent`, obj.tor, err => {
        if (err) reject(err);
        else resolve(obj);
      });

      fs.writeFile(`${obj.name}.b64`, obj.b64, err => {
        if (err) throw err;
      });
    }
  });
}

// Take an obj.name, and adds the torrent to transmission, assuming the torrent has been saved to the ./uploads directory
function addFileToTransmission(obj) {
  return new Promise((resolve, reject) => {
    if (!(obj.b64 && obj.name))
      reject(`addFileToTransmissionError: { b64:string, name: string }`);
    else {
      let torrentPath = `${obj.name}.torrent`;
      // console.log(`torrent path: ${torrentPath}`);
      transmission.addFile(
        torrentPath,
        { "download-dir": `${obj.storagePath}` },
        (err, arg) => {
          if (err) reject(err);
          else resolve(obj);
        }
      );
    }
  });
}

// if the MONGO_URL is defined, than start a change stream on the
// mongo database, so when torrents are added to the database,
// they will be added to clients that are also listening.
if (process.env["MONGO_URL"] != "mongodb://127.0.0.1:3001/meteor") {
  const storagePath = "../../../../../public/Files";
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
        .collection("torrents")
        .watch({ fullDocument: "updateLookup", useUnifiedTopology: true });
      console.log("WATCHING CHANGE STREAM");
      changeStream.on("change", next => {
        let { obj } = next.fullDocument;
        console.log(`DOCUMENT: ${JSON.stringify(next.fullDocument, null, 2)}`);
        if (obj != undefined && obj.hostname != computerHostname) {
          fs.writeFile(`${obj.filename}.torrent`, obj.tor, err => {
            if (err) throw err;
            else {
              obj.name = `${process.cwd()}/${next.fullDocument.filename}`;
              addFileToTransmission(obj);
            }
          });
          fs.writeFile(`${obj.filename}.b64`, obj.b64, err => {
            if (err) throw err;
          });
        }
      });
    })
    .catch(e => {
      console.log(`MONGODB ERROR: ${e}`);
    });
} else {
  console.log("CONNECTING TO MINI_MONGO");
}

module.exports = {
  createTorrentFromFileName,
  saveFileToTorrentFolder,
  addFileToTransmission
};
