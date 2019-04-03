import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

// export const Users = new Mongo.Collection("users");

// update this user with a groupID 
Meteor.methods({
  "users.addplayer"(ID) {
     console.log("users.updategroup")

    //finds the party based on groupID

    console.log(ID);
    let dungeonMasterDoc = Meteor.users.findOne({ _id: ID.DMID});
    console.log(dungeonMasterDoc);
    let membersList = dungeonMasterDoc.members;
    let newMembersList = membersList;

    let newMember = ID.playerID;
    console.log("playerID to add: " + newMember);  // TO DO NEED TO ADD THIS TO PARAM

    // check if the player is already in the members list
    for (let i = 0; i < membersList.length; i++) {
      console.log("in the loop");

      // get the current member being iterated on
      let currentMember = membersList[i];
      console.log("list member: " + currentMember);

      if (newMember === currentMember) {
        //  already in the list, do not add
        console.log("aLrEaDy AdDeD");
        return;

      }
    }

    // adds the player to the members array based on their player ID
    newMembersList.push(ID.playerID);
    // add player on dungeon master list
    Meteor.users.update({ profile: {groupID: ID.partyID} }, 
      { $set: {members: newMembersList} });
    }
    // update the player's group ID

});
