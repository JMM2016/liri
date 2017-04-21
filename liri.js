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

inquirer.prompt([  
  {
    type: "input",
    message: `Enter a command:  Options [ my-(t)weets, (s)potify-this-song '<song name here>',  (m)ovie-this '<movie name here>', (d)o-what-it-says ]\n `,
    name: "cmd"
  }
]).then( function (answers) {
processCommands(answers) });


function processCommands(answers){	  
   
  
    let cmd = answers.cmd.toLowerCase();
    cmd = cmd.split(" ");

    // remove quotes if any
    if ( cmd[0].charAt(0) == '"' ) {
    	cmd[0] = cmd[0].substring(1,cmd[0].length);
    	console.log(`cmd[0]= ${cmd[0]}`);
 	}

    switch (cmd[0]) {
        case ("t"):
        case ("my-tweets"):
			let client = new Twitter(keys.twitterKeys);	
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
          let movie;
		  if (cmd.length > 1) {
            movie = cmd.slice(1);
            movie = movie.join(" ");            
          }
		  else {
			movie = "Mr. Nobody";
		  }
		  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {
              if (error) {
                console.error(error);
              }
          
              if (response.statusCode == 200) {                  
                console.log(body);
              } 
            });			  
          break;

		case ("s"):
		case ("spotify-this-song"):
		  let song;
		  if (cmd.length > 1) {
            song = cmd.slice(1);
            song = song.join(" ");            
          }
		  else {
			song = "The Sign";
		  }
		  //showSong(song);
		  spotify.search({ type: 'track', query: song }, function(err, data) {
			if ( err ) {
				console.error(err);			
			}			
    		data = data.tracks.items[0];
    		console.log(`\nSong: ${data.name}  \nArtists: ${data.artists[0].name}  \nURL: ${data.preview_url} \nAlbum: ${data.album.name}`);
		  });		
		  break;
		
		case ("d"):
		case ("do-what-it-says"):
		  fs.readFile('random.txt', 'utf8', (err, data) => {
			if ( err ) {
			  console.error(err);			  	
			}			
			
			data = data.split(",");		
			
			data = data[0] + " " + data[1]

			processCommands({cmd: data});
		  });
		  break;		
		
        default:
          console.log("no match for cmd: " + answers.cmd);
    }  
}