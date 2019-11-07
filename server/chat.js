// Gregory Pierot
import { Meteor } from "meteor/meteor";
import { Messages } from "../imports/api/messages";

Meteor.methods({
  printEvents(event) {
    console.log(event);
    return "ok";
  }
});

Messages.allow({
  insert: () => true
});
