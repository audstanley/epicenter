// Richard Stanley
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tasks } from '../imports/api/tasks.js';
import { Meteor } from 'meteor/meteor';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
//   this.globalCounter = new ReactiveVar(0);
//   this.shit = ReactiveVar('Hit the click me buttoeteorn to find out');
//   this.tasks = ReactiveVar({data: 'no data'});
// });

// Template.hello.helpers({
//   globalCounter() {
//     return Template.instance().globalCounter.get();
//   },
//   counter() {
//     return Template.instance().counter.get();
//   },
//   shit() {
//     return Template.instance().shit.get();
//   },
//   tasks() {
//     console.log(Tasks.find({}, {limit:1}).fetch()[0]);
//     return Tasks.find({}, {limit: 10});
//   },

// });

// Template.hello.events({
//   'click button'(event, instance) {
//     event.preventDefault();
//     // increment the counter when button is clicked
//     //instance.globalCounter.set(instance.globalCounter.get() + 1);
//     instance.counter.set(instance.counter.get() + 1);

//     instance.tasks.set(instance.tasks.get());
//     //saveToDisk(instance.globalCounter.get().toString())
//     Meteor.call('helloWorld', Template.instance().globalCounter.get(), (error, result) => {
//       if (error) {
//         alert(error);
//       } else {
//         instance.shit.set(result);
//       }
//     });

//     Meteor.call('globalCounterFunc', Template.instance().globalCounter.get(), (error, result) => {
//       if (error) {
//         alert(error);
//       } else {
//         setTimeout(() => {
//           instance.globalCounter.set(result);
//         }, 1000)
        
//       }
//     })
//   },

// });
