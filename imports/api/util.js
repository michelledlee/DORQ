import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


// get players in a party
Meteor.methods({
  "util.rollDice"(data) {
  	console.log("util.rollDdce");

    // Make sure the user is logged in before getting but do we actually care
    if (!this.userId) {
      console.log("this probably don't even matter");
      throw new Meteor.Error("not-authorized");
    }

    // validate the data passed in
    check(data.dice, String);
    check(data.ability, String);
    
    // roll dice and get number based on which dice was rolled
    let diceRoll = 0;
    switch(data.dice) {
       case "D20":
        diceRoll = Math.random() * (21 - 1) + 1;
       break;
       case "D10":
        diceRoll = Math.random() * (11 - 1) + 1;
        break;
       case "D6":
        diceRoll = Math.random() * (6 - 1) + 1;
        break;
       case "D4":
        diceRoll = Math.random() * (4 - 1) + 1;
        break;
       default:
        break;
    }
    diceRoll = Math.trunc(diceRoll);


    // get base stat from user information
    let statBonus = 0;
    if (data.ability != "None") { // if this value has been filled in with a value other than none, get that stat
      switch(data.ability) {
         case "Strength":
          statBonus = Meteor.user().profile.stats.strength;
         break;
         case "Dexterity":
          statBonus = Meteor.user().profile.stats.dex;
          break;
         case "Constitution":
          statBonus = Meteor.user().profile.stats.constitution;
          break;
         case "Intelligence":
          statBonus = Meteor.user().profile.stats.intelligence;
          break;
         case "Wisdom":
          statBonus = Meteor.user().profile.stats.wisdom;
          break;
         case "Charisma":
          statBonus = Meteor.user().profile.stats.charisma;
          break;
         default:
          break;
      }
    }

    // add and create the string for output to chat
    let totalRoll = diceRoll + statBonus;

    return totalRoll;
}
});
