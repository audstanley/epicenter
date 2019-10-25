// Gregory Pierot

import { Template } from 'meteor/templating';
//import { Cookies } from 'meteor/mrt:cookies';
import { Messages } from '../imports/api/messages';
import './main.html';
//import './message.js';
//import './loader.html';

Template.chat.helpers({
  allMessages() {
    let arrFromDb = Messages.find().fetch()
    let allMesagesFromDataBase = arrFromDb.reverse();
    
    // let allMessagesWithPlus = allMesagesFromDataBase.map(function(messageObj) {
    //   return { message: "<strong>" + messageObj.message + "</strong>"};
    // } )
    
    let allMessagesSpliced = allMesagesFromDataBase.splice(0,10).reverse();
    //window.scrollTo(0,document.querySelector(".messages").scrollHeight);
    console.log(allMessagesSpliced)

    return allMessagesSpliced;
  }
})





Template.chat.onRendered(function bodyOnRendered() {
  
  const $messagesScroll = this.$('.messages-scroll');
  
  //this is used to auto-scroll to new messages whenever they come in
  
  let initialized = false;
  console.log('First part of onRendered ran.');
  
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

console.log('All onRendered ran.');


Template.chat.events({
  
//   send message


  'submit form'(event, instance) {
    
    event.preventDefault();
    
    const $el = $(event.currentTarget);
    const $input = $el.find('.message-input');
    const data = { message: $input.val(),};
    console.log(data);
    Messages.insert(data);

   }
   
  });
