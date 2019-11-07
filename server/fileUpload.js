// Richard Stanley
import { Meteor } from "meteor/meteor";
import {
  addFileToTransmission,
  saveFileToTorrentFolder,
  createTorrentFromFileName
} from "./torrentFunctions/torrentFunctions";
import { launchTransmission } from "../imports/api/launchTransmission";

launchTransmission();
const Files = new FilesCollection({
  collectionName: "Files",
  allowClientCode: false, // Disallow remove files from Client
  debug: true,
  storagePath: "../../../../../public/Files",
  onBeforeUpload(file) {
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
