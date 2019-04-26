import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Messages = new Mongo.Collection("messages");

if (Meteor.isServer) {
	Meteor.publish("messages", function messagesPublish() {
		return Messages
			.find({}, {
				limit: 50,
				sort: {
					createdAt: -1
				}
			});
	});
}


Meteor.methods({
	"messages.insert"(message)  {
		check(message, String);

		// Make sure the user is logged in before inserting a task
		if (! this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let thisGroup;
		if (Meteor.user().profile.role === "Dungeon Master") {
			if (Meteor.user().profile.members[0] === null) 
				{ thisGroup = ""; }
					else { thisGroup = Meteor.user().profile.groupID; }
		}
		else { thisGroup = Meteor.user().profile.groupID; }

		Messages.insert({
			message : message,
			createdAt : Date.now(),
			avatar: Meteor.user().profile.avatar,
			owner : Meteor.user().username,
			group: thisGroup
		});
	},

	"messages.getgroupmessages"(groupid) {
		check(groupid, String);

		if (! this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		Messages.find( 
			{ group: groupid }, {
				limit: 50,
				sort: {
					createdAt: 1
				}
			});
	}
});
