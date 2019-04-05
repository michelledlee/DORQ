import { Meteor } from "meteor/meteor";
import "../imports/api/messages.js";
import "../imports/api/parties.js";
import "../imports/api/util.js";
import "../imports/api/users.js";
import "../imports/api/tweeter.js";
import { WebApp } from 'meteor/webapp';
WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));


Meteor.startup(() => {
	// code to run on server at startup
});
