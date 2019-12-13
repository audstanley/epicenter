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
      const data = { 
        message: $input.val(), 
        userId: Meteor.userId(), 
        email: Meteor.user().emails[0].address, 
        color: charToColor(Meteor.userId()) 
      };
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

const charToColor = (uid) => {
  const letterNumber = uid.charCodeAt(0)
  if (letterNumber >= 60 && letterNumber <= 70)
      {
        return 'rgb(239, 83, 80)';
        // red
      }
     else if (letterNumber >= 71 && letterNumber <= 80)
      {
        return 'rgb(178, 235, 242)';
        // blue
      }
     else if (letterNumber >= 81 && letterNumber <= 90)
      {
        return 'rgb(156, 204, 101)';
        // green
      }
     else if (letterNumber >= 97 && letterNumber <= 107)
      {
        return 'rgb(255, 238, 88)';
        // yellow
      }
     else if (letterNumber >= 108 && letterNumber <= 118)
      {
        return 'rgb(225, 190, 231)';
        // purple
      }
     else if (letterNumber >= 119 && letterNumber <= 122)
      {
        return 'rgb(255, 102, 0)';
        // orange
      }
}

