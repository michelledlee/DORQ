import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


let Twitter = require("twitter-node-client").Twitter;
let twitter = new Twitter();

var error = function (err, response, body) {
	console.log("ERROR [%s]", err);
};
var success = function (data) {
	console.log("Data [%s]", data);
};

// tweet the tweets
Meteor.methods({
	"twitter.Tweet"(data) {
  	console.log("twitter.Tweet");

		twitter.postTweet(data, error, success);
	}
});

