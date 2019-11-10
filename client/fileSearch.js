// Erik
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Files } from "../imports/api/Files";
import { createDeflate } from "zlib";
import { parse } from "url";

Template.fileSearch.helpers({
  allFiles() {

    let allFilesFromMongo = Files.find().fetch();
    let allFilesFromMongoReversed = allFilesFromMongo.reverse();
    let allFilesWithSizeString = allFilesFromMongoReversed.map(fileObj => {
      return Object.assign(fileObj, {
        fDate: fileObj.meta.created_at,
        fUser: Meteor.user().emails[0].address,
        fSize: formatBytes(fileObj.size) 
      });
    });
    console.log(allFilesWithSizeString);
    return allFilesWithSizeString;
    
    // doesn't work outside allFiles()
    function formatBytes(bytes){
      if (bytes < 1024) 
        return bytes + " bytes";
      else if (bytes < 1048576)
        return (bytes / 1024).toFixed(3) + " KB";
      else if (bytes < 1073741824)
        return (bytes / 1048576).toFixed(3) + " MB";
      else
        return (bytes / 1073741824).toFixed(3) + " GB";
    };
  },  
});