import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

Template.fileUpload.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.fileUpload.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.fileUpload.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic',
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          console.log(fileObj);
          Meteor.call('makeTorrentFromUploadedFile', fileObj, (error, result) => {
            if (error)console.log(error);
            else console.log(result);
          });
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});


const Images = new FilesCollection({
  collectionName: 'Files',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    return true;
  }
});

// if (Meteor.isClient) {
//   Meteor.subscribe('files.images.all');
// }

// if (Meteor.isServer) {
//   Meteor.publish('files.images.all', function () {
//     return Images.find().cursor;
//   });
// }