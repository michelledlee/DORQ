import { Meteor } from "meteor/meteor";


let Twitter = require("twitter");
// let config = require("../../data/twitter_config");
let config = {
	"consumer_key": "8KP2BeQ6ff1Gxo3i2TW7lLZj2",
	"consumer_secret": "ya7CEHKlfbo5c5xDBHoOfMMj8LhgmsaxW91WVB6ThzMGlZrI8T",
	"access_token_key": "1084344836411420673-uJFhPInb973grXBHdJ9s7mpDF2UsJJ",
	"access_token_secret": "Ec7wAbwEp8ewfVAfhv4T9jWunLS7GQ4dyXmlwtRoJ62G0"
};

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
