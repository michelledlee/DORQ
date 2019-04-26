import { Meteor } from "meteor/meteor";
import "../imports/api/messages.js";
import "../imports/api/parties.js";
import "../imports/api/util.js";
import "../imports/api/users.js";
import "../imports/api/tweeter.js";
import "../imports/api/prompts.js";
import "../imports/api/dnd.js";
import { WebApp } from 'meteor/webapp';
WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));
// import "../imports/api/twitter.js";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";



Meteor.startup(() => {
	// code to run on server at startup
});

// Get list of all method names on Lists
const LISTS_METHODS = [
	"user.getWins",
	"util.rollDice",
	"users.addplayer",
	"users.updateID",
	"users.getMembers",
	"tweeter.tweetBot",
	"parties.createparty",
	"messages.insert",
	"messages.getgroupmessages",
	"prompts.getPrompt"
];

// Only allow 5 list operations per connection per second

if (Meteor.isServer) {
	DDPRateLimiter.addRule({
		name(name) {
			return LISTS_METHODS.includes(name);
		},

		// Rate limit per connection ID
		connectionId() { return true; }
	}, 5, 1000);
}