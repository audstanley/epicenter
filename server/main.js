import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import "../imports/api/tasks.js";
import "./chat";
import "./fileUpload.js";

Meteor.startup(() => {
  // code to run on server at startup
  console.log("it's working");
});
