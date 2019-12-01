// Erik
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Files } from "../imports/api/Files";
import { createDeflate } from "zlib";
import { parse } from "url";
import { Session } from 'meteor/session'
import { formatBytes } from "../imports/api/eriksFunctions"

Template.fileSearch.helpers({
  allFiles() {
    // var = global and let = local

    var allFilesFromMongo = Files.find().fetch();
    var allFilesFromMongoReversed = allFilesFromMongo.reverse();
    var allFilesWithSizeString = 
    allFilesFromMongoReversed.map(fileObj => {
      return Object.assign(fileObj, { 
        fDate: fileObj.meta.created_at,
        //fUser: Meteor.user().emails.address[0],
        fUser: findUsers(fileObj.userId),
        fSize: formatBytes(fileObj.size),
        fName: fileObj.name,
      });
    });
    console.log(allFilesWithSizeString);
    return allFilesWithSizeString;

    /*
    db.Files.find().pretty()
    "_id" : "QXcrq6dnQzJLN9gMk",
    "userId" : "AMtKtJKCrhYp9C5iH",

    db.users.find().pretty()
    "_id" : "FNbYxMNvGZMktffhK",
    "_id" : "AMtKtJKCrhYp9C5iH",
    */
    function findUsers(tUser){
      //let d = Meteor.user().emails[0].address;
      //let uID = Meteor.users.userId;
      //Meteor.user().emails[0].address;
      return Meteor.users.findOne(userId)
      return Meteor.users.findOne(this.tUser)

      // if user ID's match
      if (fID == uID)
        return fUser;
      else
        return "N/A";
    };
  },
});