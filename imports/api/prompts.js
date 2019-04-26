import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


// get a new game prompt
Meteor.methods({
	"prompts.getPrompt"() {

		// Make sure the user is logged in before getting but do we actually care
		if (!this.userId) {
			// console.log("this probably don't even matter");
			throw new Meteor.Error("not-authorized");
		}

		// randomly get prompt from list 
		let prompt = Math.floor(Math.random() * 10) + 1;
    
		// roll dice and get number based on which dice was rolled
		switch(prompt) {
		case 1:
			generatedPrompt = "Vistaru, Lord of the Mountain, is attacking small towns surrounded by his kingdom in hopes of expanding his army before his assault on the capital.";
			break;
		case 2:
			generatedPrompt = "Someone in the party is secretly a werewolf!";
			break;
		case 3:
			generatedPrompt = "The party has found a small cursed necklace which keeps multiplying every day. They are on an urgent quest to destroy it.";
			break;
		case 4:
			generatedPrompt = "A lich is raising a massive undead army.";
			break;
		case 5:
			generatedPrompt = "An earthquake has left magical glowing fissures in the ground directly beneath a kingdom's capital.";
			break;
		case 6:
			generatedPrompt = "A member of a party of adventurers is on the run from the law, but the local Duke has asked to see the party. The adventurer is welcome, but the guards do not know this, and the character must be smuggled into the city.";
			break;
		case 7:
			generatedPrompt = "A thick plague-inducing fog is slowly covering the countryside.";
			break;
		case 8:
			generatedPrompt = "A secret vigilante society is inflicting barbaric punishments on so-called evil-doers.";
			break;
		case 9:
			generatedPrompt = "A formerly good cleric is suspected of secretly worshiping an evil god.";
			break;
		case 10:
			generatedPrompt = "Villagers are fed up with a group of troublesome mercenaries.";
			break;
		default:
			break;
		}

		return generatedPrompt;
	}
});
