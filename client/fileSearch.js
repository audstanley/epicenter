// Erik
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Files } from "../imports/api/Files";
import { createDeflate } from "zlib";
import { parse } from "url";
// import { searchBar } from "../imports/api/eriksFunctions"

Template.fileSearch.helpers({
  allFiles() {
    let allFilesFromMongo = Files.find().fetch();
    let allFilesFromMongoReversed = allFilesFromMongo.reverse();
    let allFilesWithSizeString = allFilesFromMongoReversed.map(fileObj => {
      return Object.assign(fileObj, {
        fDate: fileObj.meta.created_at,
        fUser: Meteor.user().emails[0].address,
        fSize: formatBytes(fileObj.size),
        //fUser: findUser(fileobj.userId)
      });
    });
    return allFilesWithSizeString;
    
    // return original uploader
    // 
    // db.Files.find().pretty()
    // "userId" : "AMtKtJKCrhYp9C5iH",
    // db.users.find().pretty()
    // "_id" : "AMtKtJKCrhYp9C5iH",
    //
    // function findUser(tempuser){
    //   if (this.userId == ) {
    //     return Meteor.users.find({ _id: this.userId };      
    // };

    // doesn't work outside allFiles()
    function formatBytes(bytes) {
      return (bytes / 1048576).toFixed(2) + " MB";
    };
  },
});