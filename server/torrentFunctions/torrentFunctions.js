const createTorrent = require("create-torrent");
const fs = require("fs");
const Transmission = require("transmission");
const transmission = new Transmission({
  host: "localhost", // default 'localhost'
  port: 9091, // default 9091
  username: "audstanley", // default blank
  password: "password", // default blank
  ssl: false, // default false use https
  url: "/transmission/rpc" // default '/transmission/rpc'
});

// This function will take a filepath, and return an object of the b64 string of the binary file
// as well as the filename.
function createTorrentFromFileName(filename, storagepath) {
  return new Promise((resolve, reject) => {
    console.log(`${process.cwd()}/${filename}`);
    createTorrent(`${process.cwd()}/${filename}`, (err, tor) => {
      if (err) reject(err);
      else {
        resolve({
          name: `${process.cwd()}/${filename}`,
          b64: `${tor.toString("base64")}`,
          tor: tor,
          storagePath: `${process.cwd()}/${storagepath}`
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
      // console.log(`writing file: ${obj.name}.torrent`)
      fs.writeFile(`${obj.name}.torrent`, obj.tor, err => {
        if (err) reject(err);
        else resolve(obj);
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

module.exports = {
  createTorrentFromFileName,
  saveFileToTorrentFolder,
  addFileToTransmission
};

// ----------------------------------------------

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
// const pipeline = [{}]

// // Connection URL
// const url = 'mongodb://localhost:27017/pirateHub?replicaSet=rs0"';

// // Database Name
// const dbName = 'pirateHub';

// // Use connect method to connect to the server
// MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");

//     const db = client.db('pirateHub');
//     // const collection = db.collection('test').watch({ fullDocument: "updateLookup"})
//     //     .on('change', data => {
//     //         console.log(new Date(), data)
//     //     })
//     client.close();
// });
