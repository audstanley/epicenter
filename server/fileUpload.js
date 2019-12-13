// Richard Stanley
import { Meteor } from "meteor/meteor";
import {
  addFileToTransmission,
  saveFileToTorrentFolder,
  createTorrentFromFileName
} from "./torrentFunctions/torrentFunctions";
import { launchTransmission } from "../imports/api/launchTransmission";
import { launchDocumentationJs } from "../imports/api/launchDocumenationJs";
import { hostname } from "os";
const computerHostname = hostname();

try {
  launchTransmission();
} catch (e) {
  console.log(`EpicenterError: ${e}\n\n`);
  console.log(
    `Could not launch Transmission, You likely need to install: https://transmissionbt.com/download/ before running meteor`
  );
}

try {
  launchDocumentationJs();
} catch (e) {
  console.log(`EpicenterError: ${e}\n\n`);
  console.log(
    `Could not launch documentation.js, You likely need to install on Linux: sudo npm i -g documentation.js`
  );
  console.log(`Or on Windows: npm i -g documentation.js`);
}

const Files = new FilesCollection({
  collectionName: "Files",
  allowClientCode: false, // Disallow remove files from Client
  debug: true,
  storagePath: "../../../../../public/Files",
  onBeforeUpload(file) {
    file.hostname = computerHostname;
    return true;
  }
});

Meteor.methods({
  async makeTorrentFromUploadedFile(fileObj) {
    console.log(
      `A file was uploaded: ${fileObj.name} from userId: ${fileObj.userId}`
    );
    return createTorrentFromFileName(
      `${fileObj.path}`,
      `${fileObj._storagePath}`
    )
      .then(o => saveFileToTorrentFolder(o))
      .then(o => addFileToTransmission(o))
      .catch(e => console.log(e));
  }

  // async getAllFiles() {
  //   let filesFromDatabase = await Files.find({}).fetch();
  //   return filesFromDatabase;
  // }
});
