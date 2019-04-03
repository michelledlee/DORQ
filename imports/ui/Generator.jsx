import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class Generator extends Component {
  constructor(props) {
    super(props);

    this.ability = "";
    this.dice = "";
    this.onSubmit = this.onSubmit.bind(this);

  }

  // Want to print out a line to chat that says what a certain roll was
  onSubmit = e => {
    e.preventDefault();

    // roll dice and get number based on which dice was rolled
    let diceRoll = 0;
    switch(this.dice.value) {
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
    if (this.ability.value != "None") { // if this value has been filled in with a value other than none, get that stat
      switch(this.ability.value) {
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
    alert(totalRoll);
  }

  render() {
    return (
       <div className="container">
       
              <div className="card-body">
                <h5 className="card-title">My Dice</h5>
                <form
                  className="form-signin"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <div className="form-label-group">
                  <label htmlFor="optionsselect">Choose Ability</label>
                  <select 
                    className="form-control" 
                    id="optionsselect"
                    ref={input => (this.ability = input)}>
                    <option>None</option>
                    <option>Strength</option>
                    <option>Dexterity</option>
                    <option>Constitution</option>
                    <option>Intelligence</option>
                    <option>Wisdom</option>
                    <option>Charisma</option>
                  </select>
                  </div>
                                    <div className="form-label-group">
                  <label htmlFor="optionsselect">Choose Dice</label>
                  <select 
                    className="form-control" 
                    id="optionsselect"
                    ref={input => (this.dice = input)}>
                    <option>D20</option>
                    <option>D10</option>
                    <option>D6</option>
                    <option>D4</option>
                  </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-dark text-uppercase"
                  >
                    Feeling Lucky?
                  </button>
                </form>

        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Generator);