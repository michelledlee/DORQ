import { Meteor } from "meteor/meteor";

let Twitter = require("twitter");
// let config = require("../../data/twitter_config");
let config;

config = {
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	};
console.log("Config = ", config);

let T = new Twitter(config);

// Set up search parameters
let params = {
	q: "#dungeonsandragons",
	count: 10,
	result_type: "recent",
	lang: "en"
};

// tweet out tweets on the DORQ account
Meteor.methods({
	"tweeter.tweetBot"(data) {
		if (data === "" || data === null) {
			return;
		}
		T.post("statuses/update", { status: data }, function(
			error,
			tweet,
			response
		) {
			console.log("error: ", error);
			if (error) throw error;
			console.log(tweet); // Tweet body.
			console.log(response); // Raw response object.
		});
	}
});

// print out the tweets for the news feed
Meteor.methods({
	async "tweeter.printTweets"() {
		return await T.get("search/tweets", params);

		//  function(err, data, response) {
		// 	// If there is no error, proceed
		// 	if (!err) {
		// 		console.log("from tweeter");
		// 		console.log(data);
		// 		return data;
		// 	} else {
		// 		console.log(err);
		// 	}
		// });
	}
});