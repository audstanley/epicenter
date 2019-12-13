// Gregory Pierot

import { Template } from "meteor/templating";
//import { Cookies } from 'meteor/mrt:cookies';
import { Messages } from "../imports/api/messages";
import "./main.html";
//import './message.js';
//import './loader.html';

Template.chat.helpers({
  allMessages() {
    let arrFromDb = Messages.find().fetch();
    let allMesagesFromDataBase = arrFromDb.reverse();
    let allMessagesSpliced = allMesagesFromDataBase.reverse();
    return allMessagesSpliced;
  }
});

Template.chat.onRendered(function bodyOnRendered() {
  //const $messagesScroll = this.$(".messages-scroll");
  //this is used to auto-scroll to new messages whenever they come in
  // setTimeout(() => {
  //   let scrollToBottom = document.querySelector(".messages").scrollHeight;
  //   window.scrollTo(0, scrollToBottom);
  // }, 50);
  // this.autorun(() => {
  //   if (this.messagesSub.ready()) {
  //     Messages.find({}, { fields: { _id: 1 } }).fetch();
  //     Tracker.afterFlush(() => {
  //       //only auto-scroll if near the bottom already
  //       if (!initialized || Math.abs($messagesScroll[0].scrollHeight - $messagesScroll.scrollTop() - $messagesScroll.outerHeight()) < 200) {
  //         initialized = true;
  //         $messagesScroll.stop().animate({
  //           scrollTop: $messagesScroll[0].scrollHeight
  //         });
  //       }
  //     });
  //   }
  // });
});

console.log("All onRendered ran.");

Template.chat.events({
  //   send message

  "submit form"(event, instance) {
    event.preventDefault();
    let userId = Meteor.userId();
    if (userId) {
      const $el = $(event.currentTarget);
      const $input = $el.find(".message-input");
      const data = { message: $input.val(), userId: Meteor.userId() };
      console.log(data);
      Messages.insert(data);
      document.querySelector(".message-input").value = "";
      let scrollLocation = document.querySelector(".messages").scrollHeight;
      window.scrollTo(0, scrollLocation);
    } else {
      alert("You must be signed in in order to post.");
    }
  }
});
