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
  },
  getRandomColor () {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }
});


Template.chat.events({
  //   send message

  "submit form"(event, instance) {
    event.preventDefault();
    let userId = Meteor.userId();
    if (userId) {
      const $el = $(event.currentTarget);
      const $input = $el.find(".message-input");
      const data = { message: $input.val(), userId: Meteor.userId(), email: Meteor.user().emails[0].address };
      console.log(data);

      const firstChar = (Meteor.userId().charAt(0));
      

      Messages.insert(data);
      document.querySelector(".message-input").value = "";
      let scrollLocation = document.querySelector(".messages").scrollHeight;
      window.scrollTo(0, scrollLocation);
    } else {
      alert("You must be signed in in order to post.");
    }
  }
});


