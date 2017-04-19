// 1. my-tweets
// 2. spotify-this-song '<song name here>'
// 3. movie-this '<movie name here>'
// 4. do-what-it-says

const keys = require('./keys.js');
const fs = require("fs");
const inquirer = require("inquirer");
let request = require("request");
let Twitter = require("twitter");
let spotify = require("spotify");
let client = new Twitter(keys.twitterKeys);


inquirer.prompt([

  // Here we create a basic text prompt.
  {
    type: "input",
    message: "Enter a command?",
    name: "cmd"
  },

  // Here we create a basic password-protected text prompt.
  // {
  //   type: "password",
  //   message: "Please set your password",
  //   name: "password"
  // },
  //
  // // Here we give the user a list to choose from.
  // {
  //   type: "list",
  //   message: "Which sport is your favorite?",
  //   choices: ["Baseball", "BasketBall", "Football", "Hockey", "Soccer"],
  //   name: "sport"
  // },
  //
  // {
  // 	type: "checkbox",
  // 	message: "Did you do any of the following for your favorite sport?",
  // 	choices: ["Play", "Watch", "Play & Watch"],
  // 	name: "did"
  // },

  // Here we ask the user to confirm.
  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true
  }

]).then(function(answers) {  
  //console.log(JSON.stringify(answers, null, 2));
  //console.log("ans.conf: " + answers.confirm);
  
  if (answers.confirm) {
    switch (answers.cmd.toLowerCase()) {
        case ("t"):
        case ("my-tweets"):    			
          //var params = {screen_name: 'miguel_m2017'};
    			client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=miguel_m2017&count=20', function (error, tweets, response) {
          //client.get('statuses/user_timeline', params, function (error, tweets, response) {
    				if (error) {
    					console.error(error);
    				}
				
    				if( response.statusCode == 200 ) {    					
              for (let prop in tweets) {                
                console.log(`On ${tweets[prop].created_at} miguel_m2017 tweeted:  ${tweets[prop].text} `);
              }              
    				}
            else {
              console.log("sc: " + response.statusCode);
            }

			    });	
          break;
        default:
          console.log("no match for cmd: " + answers.cmd);
    }

  // If the user does not confirm, then a message is provided and the program quits.
  } else {
    console.log("Didn't confirm");
  }

});