// Erik
// import { Template } from "meteor/templating";
// import { ReactiveVar } from "meteor/reactive-var";
// import { Files } from "../imports/api/Files";

// Template.displayFiles.helpers({
//   allFiles() {
//     let allFilesFromMongo = Files.find().fetch();
//     let allFilesFromMongoReversed = allFilesFromMongo.reverse();
//     let allFilesWithSizeString = allFilesFromMongoReversed.map(fileObj => {
//       return Object.assign(fileObj, {
//         sizeSting: parseInt(fileObj.size).toString()
//       });
//     });
//     console.log(allFilesWithSizeString);
//     return allFilesWithSizeString;
//   }
// });
