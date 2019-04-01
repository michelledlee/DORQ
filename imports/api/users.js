import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Users = new Mongo.Collection("users");

// associate 
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
