import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

// export const Users = new Mongo.Collection("users");

// update this user with a groupID 
Meteor.methods({
  "users.addplayer"(ID) {
     console.log("users.addplayer")

    //finds the party based on groupID

    console.log(ID);
    let dungeonMasterDoc = Meteor.users.findOne({ _id: ID.DMID});
    console.log(dungeonMasterDoc);
    let membersList = dungeonMasterDoc.profile.members;
    let newMembersList = membersList;

    let newMember = ID.playerID;
    console.log("playerID to add: " + newMember);  // TO DO NEED TO ADD THIS TO PARAM

    // check if the player is already in the members list
    for (let i = 0; i < membersList.length; i++) {
      console.log("in the loop");

      // get the current member being iterated on
      let currentMember = membersList[i];
      console.log("list member: " + currentMember);

      if (currentMember === null) {
        newMembersList[i] = newMember;
        Meteor.users.update({ _id: ID.DMID }, { $set: {"profile.members": newMembersList} });
        return;
      }

      if (newMember === currentMember) {
        //  already in the list, do not add
        console.log("aLrEaDy AdDeD");
        return;

      }
    }

    // adds the player to the members array based on their player ID
    newMembersList.push(ID.playerID);
    console.log(newMembersList);
    // add player on dungeon master list
    Meteor.users.update({ _id: ID.DMID }, 
      { $set: {"profile.members": newMembersList} });
    }

});

// update a player's group ID
Meteor.methods({
  "users.updateID"(ID) {
     console.log("users.updateID")

    Meteor.users.update({ _id: ID.playerID }, 
      { $set: {"profile.groupID": ID.partyID} });
    }

});


// get players in a party
Meteor.methods({
  "users.getMembers"(ID) {
    return Meteor.users.find({"profile.groupID": ID.partyID});
}
});
