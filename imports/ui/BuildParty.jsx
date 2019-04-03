import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
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

    let data = { partyID: this.id, playerID: this.playerID.value };
    Meteor.call("parties.addplayer", data, (err, res) => {
      if (err) {
        alert("There was error inserting check the console");
        console.log(err);
        return;
      }
      console.log(res);
    });
  }

  render() {
    return (
      <div>
      <form
          className="form-signin"
          noValidate
          onSubmit={this.onSubmit.bind(this)}
        >
        <div className="form-label-group">
          <label htmlFor="playerID">Player ID: </label>
          <input className="playerid"
            id="playerID"
            type="text"
            min="0"
            ref={input => (this.playerID = input)}
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
})(BuildParty);