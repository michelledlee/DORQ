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

// create a new party
Meteor.methods({
  "parties.createparty"(party) {
    console.log("parties.createparty");

    // create a new party for this DM
    return Parties.insert({
      masterID: party.DMID,
      partyID: party.groupID,
      partyName: party.name,
      members: [String]
    });
  }
});

// add a member to a party
Meteor.methods({
  "parties.addplayer"(party) {
     console.log("parties.addplayer")

    //finds the party based on groupID

    console.log(party);
    let partyDocument = Parties.findOne({ partyID: party.groupID });
    console.log(partyDocument);
    let membersList = partyDocument.members;
    let newMembersList = membersList;

    let newMember = party.playerID;
    console.log("playerID to add: " + newMember);  // TO DO NEED TO ADD THIS TO PARAM

    // check if the player is already in the members list
    for (let i = 0; i < membersList.length; i++) {
      console.log("in the loop");

      // get the current member being iterated on
      let currentMember = party.members[i];
      console.log("list member: " + currentMember);

      if (newMember === currentMember) {
        //  already in the list, do not add
        console.log("aLrEaDy AdDeD");
        return;

      }
    }

    // adds the player to the members array based on their player ID
    newMembersList.push(party.playerID);
    Parties.update({ partyID: party.groupID }, 
      { $set: {members: newMembersList} });
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
