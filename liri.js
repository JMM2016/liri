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
  {
    type: "input",
    message: `Enter a command:  Options [ my-tweets, spotify-this-song '<song name here>',  movie-this '<movie name here>', do-what-it-says ]\n `,
    name: "cmd"
  }
]).then(function(answers) {  
   //console.log(JSON.stringify(answers, null, 2));     
  
    let cmd = answers.cmd.toLowerCase();
    cmd = cmd.split(" ");
    switch (cmd[0]) {
        case ("t"):
        case ("my-tweets"):    			          
    			client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=miguel_m2017&count=20', function (error, tweets, response) {          
    				if (error) {
    					console.error(error);
    				}
				
    				if( response.statusCode == 200 ) {    					
              for (let prop in tweets) {                
                console.log(`On ${tweets[prop].created_at} miguel_m2017 tweeted:  ${tweets[prop].text} `);
              }              
    				}
            else {
              console.log("status code: " + response.statusCode);
            }

			    });	
          break;
        
        case ("m"):
        case ("movie-this"):
          if (cmd.length > 1) {
            let movie = cmd.slice(1);
            movie = movie.join(" ");
            console.log("movie = " + movie);
            request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {
              if (error) {
                console.error(error);
              }
          
              if (response.statusCode == 200) {                  
                console.log(body);
              } 
            });
          }  
          break;

        default:
          console.log("no match for cmd: " + answers.cmd);
    }  
    
});