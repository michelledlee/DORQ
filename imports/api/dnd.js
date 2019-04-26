import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

// Getting JSON index of spells
Meteor.methods({
	"dnd.getSpells"() {
		if (Meteor.isServer) {
			try {
				let response = HTTP.call(
					"GET",
					"http://dnd5eapi.co/api/spells/"
				);
				// console.log("RESPONSEFROMDND", response.content);
				let fullJSON = JSON.parse(response.content);
				// console.log("ADDRESSS LOCATION PARSE JSON", fullJSON);
				//console.log(fullJSON);
				return fullJSON.results;
			} catch (e) {
				console.log("address error" + e);
			}
		}
	}
});

// Getting JSON index of weapons
Meteor.methods({
	"dnd.getEquipment"() {
		if (Meteor.isServer) {
			try {
				let response = HTTP.call(
					"GET",
					"http://dnd5eapi.co/api/equipment/"
				);
				// console.log("RESPONSEFROMDND", response.content);
				let fullJSON = JSON.parse(response.content);
				// console.log("weapons", fullJSON);
				// console.log("ADDRESSS LOCATION PARSE JSON", fullJSON);
				//console.log(fullJSON);
				return fullJSON.results;
			} catch (e) {
				console.log("address error" + e);
			}
		}
	}
});

// Getting all spells in a JSON list
Meteor.methods({
	"dnd.parseSpells"(jsonSpells) {
		console.log(jsonSpells);
		if (Meteor.isServer) {
			let list = [];
			console.log(jsonSpells.length);

			for (let i = 0; i < jsonSpells.length; i++) {
				// console.log(jsonSpells[i]);
				// console.log(jsonSpells[i].url);

				try {
					let response = HTTP.call("GET", jsonSpells[i].url);
					// console.log("RESPONSEFROMDND", response.content);
					let fullJSON = JSON.parse(response.content);

					// add the full spell to the list
					list.push(list, fullJSON);
				} catch (e) {
					console.log("address error" + e);
				}
			}
			console.log(list);
			return list;
		}
	}
});

// Getting all spells in a JSON list
Meteor.methods({
	"dnd.getOneSpell"(url) {
		if (Meteor.isServer) {
			// let URL = JSON.stringify(url);
			// console.log(url);
			try {
				let response = HTTP.call("GET", url);
				// console.log("SPELL", response.content);
				let fullJSON = JSON.parse(response.content);
				// console.log(fullJSON);
				return fullJSON.results;
			} catch (e) {
				console.log("address error" + e);
			}
		}
	}
});

// Getting JSON index of spells
Meteor.methods({
	"dnd.cantHoldAllTheseSpells"() {
		const TOTALSPELLS = 319;
		let list = [];
		if (Meteor.isServer) {
			try {
				let response = HTTP.call(
					"GET",
					"http://dnd5eapi.co/api/spells/"
				);
				// console.log("RESPONSEFROMDND", response.content);
				// let fullJSON = JSON.parse(response.content);
				let fullJSON = response.content;

				// console.log("ADDRESSS LOCATION PARSE JSON", fullJSON);
				// console.log(fullJSON);
				// return fullJSON.results;

				for (let i = 0; i < TOTALSPELLS; i++) {
					try {
						let spell = HTTP.call("GET", fullJSON.results[i].url);
						console.log(spell);
						// console.log("the spell: ", spell.content);
						let spellJSON = JSON.parse(spell.content);
						console.log(spellJSON);

						// add the full spell to the list
						list.push(spellJSON);
					} catch (e) {
						console.log("address error" + e);
					}
				}
				console.log(list.length);
				console.log(list);
				return list;
			} catch (e) {
				console.log("address error" + e);
			}
		}
	}
});