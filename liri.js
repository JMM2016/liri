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

var client = new Twitter(keys.twitterKeys);

var params = {screen_name: 'miguel_m2017'};



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

// Once we are done with all the questions... "then" we do stuff with the answers
// In this case, we store all of the answers into a "user" object that inquirer makes for us.
]).then(function(answers) {
  
  // If we log that user as a JSON, we can see how it looks.
  console.log(JSON.stringify(answers, null, 2));
  //console.log("ans.conf: " + answers.confirm);

  // If the user confirms, we displays the user's name and pokemon from the answers.
  if (answers.confirm) {
    // console.log("==============================================");
    // console.log("");
    // console.log("Welcome " + user.name);
    // console.log(user.sport + " is a great sport!");
    // console.log("You " + user.did + " " + user.sport);
    // console.log("==============================================");

    switch (answers.cmd.toLowerCase()) {
        case ("t"):
        case ("my-tweets"):
    			// get request twttier API
          //var params = {screen_name: 'miguel_m2017'};
    			client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=miguel_m2017&count=20', function (error, tweets, response) {
          //client.get('statuses/user_timeline', params, function (error, tweets, response) {
    				if (error) {
    					console.error(error);
    				}
				
    				if( response.statusCode == 200 ) {
    					//console.log(JSON.stringify(tweets, null, 2));              
              //console.log( Object.keys(tweets) );
              for (let prop in tweets) {
                //console.log(`${prop} in tweets = ${tweets[prop].text}`);
                console.log(`On ${tweets[prop].created_at} miguel_m2017 tweeted:  ${tweets[prop].text} `);
              }
              console.log("sc == 200");
    				}	else {
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

// "user":{"statuses_count":3080, "favourites_count":22, "protected":false, "profile_text_color":"437792", "profile_image_url":"..."
// "profile_image_url":"...", 
// "name":"Twitter API", 

// "profile_sidebar_fill_color":"a9d9f1", "listed_count":9252, "following":true,
// "profile_background_tile":false, "utc_offset":-28800,
// "description":"The Real Twitter API. I tweet about API changes. Don't get an answer? It's on my website.",
// "location":"San Francisco, CA", "contributors_enabled":true, "verified":true, "profile_link_color":"0094C2",
// "followers_count":665829, "url":"http:\/\/dev.twitter.com", "default_profile":false, "profile_sidebar_border_color":"0094C2",
// "screen_name":"twitterapi", "default_profile_image":false, "notifications":false, "display_url":null,
// "show_all_inline_media":false, "geo_enabled":true, "profile_use_background_image":true, "friends_count":32, 


// "id_str":"6253282",


// "entities":{"hashtags":[], "urls":[], "user_mentions":[]}, "expanded_url":null, "is_translator":false, "lang":"en",
// "time_zone":"Pacific Time (US & Canada)", "created_at":"Wed May 23 06:01:13 +0000 2007", "profile_background_color":"e8f2f7",
// "id":6253282, "follow_request_sent":false, "profile_background_image_url_https":"...", "profile_background_image_url":"...",}
