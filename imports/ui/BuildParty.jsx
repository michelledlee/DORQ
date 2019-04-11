import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


// This class adds party members to an existing party
class BuildParty extends Component {
  constructor(props) {
    super(props);

    this.id = Meteor.user().profile.groupID;
    this.playerID = Meteor.user()._id;
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    event.preventDefault();

    let data = { partyID: this.id, playerID: this.inputID.value, DMID: this.playerID };
    // first add this player to the DMs member list
    Meteor.call("users.addplayer", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
        // update the player's groupID if the add to the DM was successful
        Meteor.call("users.updateID", data, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
      });
    });
    window.location.reload(); 
  }


  render() {
    return (
      <div>
      <div className="row">
      <form
          className="form-signin"
          noValidate
          onSubmit={this.onSubmit.bind(this)}
        >
        <div className="form-label-group">
          <label htmlFor="playerID" id="boxspace">Player ID: </label>
          <input className="playerid"
            id="playerID"
            type="text"
            min="0"
            ref={input => (this.inputID = input)}
          />
            <button
              type="submit"
              className="btn btn-xl btn-dark text-uppercase"
            >
              Add Adventurer!
            </button>
            </div>
        </form>
      </div>
      </div>
      )
  }

    }


BuildParty.propTypes = {
  groupID: PropTypes.string
}


export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withRouter(BuildParty));