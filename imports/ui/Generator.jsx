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

    this.state = {
      roll: 0
    }

  }

  // Want to print out a line to chat that says what a certain roll was
  onSubmit = e => {
    e.preventDefault();

    let data = {dice: this.dice.value, ability: this.ability.value };
    Meteor.call("util.rollDice", data, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
        this.setState({
        roll: res
      });
        console.log(res);
      });

    if (this.state.roll === 0) {
      this.state.roll++;
    }

    if (this.ability.value === "None") {
          let rollMessage = "Rolled a " + this.state.roll + ".";
                  Meteor.call("messages.insert", rollMessage, (err, res) => {
              if (err) {
                alert("There was error inserting check the console");
                // console.log(err);
                return;
              }
            });
        }
        else {
        // make a string to pass the chat function
        let rollMessage = "Rolled a " + this.state.roll + " in " + this.ability.value + ".";
                Meteor.call("messages.insert", rollMessage, (err, res) => {
              if (err) {
                alert("There was error inserting check the console");
                // console.log(err);
                return;
              }
            });
      }
  }

  render() {
    return (
       <div className="container">
       
              <div className="card-body">
                <h3 className="card-title">My Dice</h3>
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
                  <label htmlFor="optionsselect2">Choose Dice</label>
                  <select 
                    className="form-control" 
                    id="optionsselect2"
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
    user: Meteor.user(),
    // roll: this.state.roll
  };
})(Generator);