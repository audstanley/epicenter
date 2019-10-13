import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import { FilesCollection } from "meteor/ostrio:files";

Template.fileUpload.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
});

Template.fileUpload.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.fileUpload.events({
  "change #fileInput"(event, templateInstance) {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert(
        {
          file: event.currentTarget.files[0],
          streams: "dynamic",
          chunkSize: "dynamic"
        },
        false
      );

      upload.on("start", function() {
        templateInstance.currentUpload.set(this);
      });

      upload.on("end", function(error, fileObj) {
        if (error) {
          alert("Error during upload: " + error);
          $(`#uploadFeedback`).append(
            `<div class="unsuccessfulUpload">
            <p>Error uploading: <strong>${fileObj.name}</strong></p>
            </div>`
          );
          $(`.unsuccessfulUpload`).css({ "background-color": "#FFD9CD" });
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');
          $(`#uploadFeedback`).append(
            `<div class="successfulUpload">
              <p>Successfully uploaded:
              <strong>${fileObj.name}</strong></p>
            </div>`
          );

          $(`.successfulUpload`).css({ "background-color": "#DEFFEC" });

          Meteor.call(
            "makeTorrentFromUploadedFile",
            fileObj,
            (error, result) => {
              if (error) console.log(error);
              else console.log(result);
            }
          );
        }
        templateInstance.currentUpload.set(false);
      });

      upload.start();
    }
  }
});

const Images = new FilesCollection({
  collectionName: "Files",
  allowClientCode: false, // Disallow remove files from Client
  storagePath: "../../../../../public/Files"
});
