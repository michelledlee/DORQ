import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import BuildParty from "./BuildParty.jsx";

class DungeonMaster extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.avatar = "";
    this.role = "";
    this.groupNo = "";
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      partyMembers: []
    };

  }


  getPartyPeople() {
      Meteor.call("users.getMembers", this.id, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
        this.setState({
        partyMembers: res
      });
        console.log(res);
      });
  }

  onSubmit() {
    Template.twitterConnect.events({
    'click span.connectTwitter' : function () {
      Meteor.connectWithTwitter(options, function () {
        console.log(arguments);
      });
    }
  });
  }

  renderthePartyMembers() {
    return this.state.partyMembers.map((m, j) => (
      <div className="card col-4" key={m._id}>
        <span>
          <strong>Name:</strong> {m.profile.name}
        </span>
        <span>
          <strong>Class:</strong> {m.profile.role}
        </span>
        <span>
          <strong>Level:</strong> {m.profile.level}
        </span>
      </div>
    ));
  }

  render() {
    return (
      <div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align" style={{padding:"100px"}}>
      <div className="row">{this.renderthePartyMembers()}</div>
      <BuildParty />
      <button onSubmit={this.onSubmit.bind(this)}>Click Me</button>
      </div>
      </div>
      </div>
      </div>
      );
  }
}

DungeonMaster.propTypes = {
  partyMembers: PropTypes.arrayOf(PropTypes.object)
};


export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(DungeonMaster);