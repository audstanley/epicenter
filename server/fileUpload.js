// Richard Stanley
import { Meteor } from 'meteor/meteor';
import { addFileToTransmission, 
    saveFileToTorrentFolder, 
    createTorrentFromFileName } from './torrentFunctions/torrentFunctions.js';

const Images = new FilesCollection({
    collectionName: 'Files',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
      return true;
    }
});

Meteor.methods({
    makeTorrentFromUploadedFile(fileObj) {
        console.log(fileObj);
        return createTorrentFromFileName(`${fileObj.path}`, `${fileObj._storagePath}`)
            .then(o => saveFileToTorrentFolder(o))
            .then(o => addFileToTransmission(o))
            .catch(e => e);
    }
});