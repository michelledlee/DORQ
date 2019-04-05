import { Meteor } from "meteor/meteor";


let Twitter = require("twitter");
// let config = require("../../data/twitter_config");
let config;

if(process.env.TWITTER_CONSUMER_KEY) {
	config = {
		"consumer_key": process.env.TWITTER_CONSUMER_KEY,
		"consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
		"access_token_key": process.env.TWITTER_ACCESS_TOKEN_KEY,
		"access_token_secret":process.env.TWITTER_ACCESS_TOKEN_SECRET
	};
 
} else {
	config = require("./config.js");
}

console.log("Config = ", config);

let T = new Twitter(config);

// Set up search parameters
let params = {
	q: "#dungeonsandragons",
	count: 10,
	result_type: "recent",
	lang: "en"
};

// print urls for tweets in console....
Meteor.methods({
	"tweeter.tweetBot"(data) {
  	console.log("tweeter.tweetBot");

		//     T.get('search/tweets', params, function(err, data, response) {
		//   // If there is no error, proceed
		//   if(!err){
		//     // Loop through the returned tweets
		//     for(let i = 0; i < data.statuses.length; i++){
		//       // Get the tweet Id from the returned data
		//       let id = { id: data.statuses[i].id_str }
		//       // Try to Favorite the selected Tweet
		//       T.post('favorites/create', id, function(err, response){
		//         // If the favorite fails, log the error message
		//         if(err){
		//           console.log(err[0].message);
		//         }
		//         // If the favorite is successful, log the url of the tweet
		//         else{
		//           let username = response.user.screen_name;
		//           let tweetId = response.id_str;
		//           console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
		//         }
		//       });
		//     }
		//   } else {
		//     console.log(err);
		//   }
		// })
		console.log(data);
		if (data === "" || data === null) {
			console.log("Invalid tweet");
			return;
		}
		T.post("statuses/update", {status: data},  function(error, tweet, response) {
			if(error) throw error;
			console.log(tweet);  // Tweet body.
			console.log(response);  // Raw response object.
		});
	}
});
