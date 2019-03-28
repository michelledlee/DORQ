import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Parties = new Mongo.Collection("parties");

if (Meteor.isServer) {
  Meteor.publish("parties", function eventsPublish() {
    try {
      return Parties.find(
        {},
        {
          limit: 10,
          sort: {
            createdAt: -1
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  });

}

// add a new party
Meteor.methods({
  "parties.insert"(party) {
    console.log("parties.insert");

    return Parties.insert({
      partyID: party.groupID,
      size: party.size,
      members: [String],
      full: false
    });
  }
});

// get all parties
Meteor.methods({
  "parties.get"() {
    console.log("parties.get");

    // Make sure the user is logged in before getting but do we actually care
    if (!this.userId) {
      console.log("this probably don't even matter");
      throw new Meteor.Error("not-authorized");
    }

    return Parties.find({});
  }
});
