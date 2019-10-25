
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../imports/api/tasks.js';
import './chat';
import "./fileUpload.js";

const fs = require("fs");
const fetch = require("node-fetch");

let globalCounter = 0;

Meteor.startup(() => {
  // code to run on server at startup
  console.log("it's working");
});

Meteor.methods({
  helloWorld(data) {
    fs.writeFile(
      "./poop.txt",
      `the global counter * 2 = ${(data * 2).toString()}`,
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("saved file");
        }
      }
    );

    let d = fetch(
      "http://api.openweathermap.org/data/2.5/weather?zip=92630,us&APPID=06eb04611b508e74c1a6f0f4e2968ca2"
    )
      .then(d => d.json())
      .then(d => {
        let kelvinToFer = Math.round(((d.main.temp - 273.15) * 9) / 5 + 32);
        console.log(kelvinToFer);
        return `${kelvinToFer}°F`;
      });

    return d;
  },

  globalCounterFunc(data) {
    let newGlobalCounter = globalCounter + 1;
    globalCounter = newGlobalCounter;
    return newGlobalCounter;
  }
});
