import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Meteor } from "meteor/meteor";
import { Files } from "../imports/api/Files";

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
      const upload = Files.insert(
        {
          file: event.currentTarget.files[0],
          streams: "dynamic",
          chunkSize: "dynamic",
          meta: {
            downloads: 0,
            created_at: new Date().toLocaleString(),   // or .toUTCString()
          }
        },
        false
      );

      upload.on("start", function() {
        templateInstance.currentUpload.set(this);
      });

      upload.on("end", function(error, fileObj) {
        if (error) {
          alert("Error during upload: " + error);
          $(`#uploadFeedback`).html(
            `<div class="unsuccessfulUpload">
            <p>Error uploading: <strong>${fileObj.name}</strong></p>
            </div>`
          );
          $(`.unsuccessfulUpload`).css({ "background-color": "#FFD9CD" });
        } else {
          //alert('File "' + fileObj.name + '" successfully uploaded');

          $(`#uploadFeedback`).html(
            `<div class="successfulUpload" id="successfulUpload">
              <p>Successfully uploaded:
              <strong>${fileObj.name}</strong></p>
            </div>`
          );

          Velocity(
            document.getElementsByClassName("successfulUpload"),
            { opacity: 0 },
            { duration: 0 }
          );
          Velocity(
            document.getElementsByClassName("successfulUpload"),
            { opacity: 0.8 },
            { duration: 1000, delay: 200 }
          );

          //$(`.successfulUpload`).css({ "background-color": "#DEFFEC" });

          Meteor.call(
            "makeTorrentFromUploadedFile",
            fileObj,
            (error, result) => {
              if (error) console.log(error);
              else console.log(`makeTorrentFromUploadFileCall: ${result}`);
            }
          );
        }
        templateInstance.currentUpload.set(false);
      });

      upload.start();
    }
  },
  "mouseenter #uploadBoxArea2": (event, templateInstance) => {
    console.log("mousehover", event);
  }
});
