import { Meteor } from "meteor/meteor";


let Twitter = require('twitter');
// let config = require("../../data/twitter_config");
let config = {
	"consumerKey": "8KP2BeQ6ff1Gxo3i2TW7lLZj2",
	"consumerSecret": "ya7CEHKlfbo5c5xDBHoOfMMj8LhgmsaxW91WVB6ThzMGlZrI8T",
	"accessToken": "1084344836411420673-dzGkzfUJEd5u7cqd8D8p0Hq1ovnGND",
	"accessTokenSecret": "qSOUfeDh5NZgk30YcYABi0g94L6sDQWRr95jVl0hfZs2h",
	"callBackUrl": "http(s)://127.0.0.1"
}

let T = new Twitter(config);

// Set up search parameters
let params = {
	q: '#dungeonsandragons',
	count: 10,
	result_type: 'recent',
	lang: 'en'
}

// print urls for tweets in console....
Meteor.methods({
  "tweeter.tweetBot"(data) {
  	console.log("tweeter.tweetBot");

    T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to Favorite the selected Tweet
      T.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
  }
});
