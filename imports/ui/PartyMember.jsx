import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import PartyChat from "./PartyChat.jsx"
import Generator from "./Generator.jsx";

class PartyMember extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.avatar = "";
    this.role = "";
    this.groupNo = "";
    this.level = 0;
  }

  componentDidMount() {
    if (Meteor.user()) {
      this.name = Meteor.user().username;
      this.avatar = Meteor.user().profile.avatar;
      this.role = Meteor.user().profile.role;
      this.groupNo = Meteor.user().profile.groupID;
      this.level = Meteor.user().profile.level;
    }
  }

  render() {
    return (
      <div>
      <h2>Player Info</h2>
      <div className="row">
      <div className="col-1">
      </div>
      <div className="col-4">
      <img src={Meteor.user().profile.avatar} alt="my face"/><br />
      <b>ID:</b> {Meteor.user()._id}<br />
      <b>Email:</b> {Meteor.user().email}<br />
      </div>
      <div className="col-1">
      </div>
      <div className="col-4">
      <b>Character
      Name:</b> {this.name} <br/>
      <b>Class:</b> {this.role}<br/>
      <b>Status:</b> {this.groupNo != "" ? "Active" : "Not Active"}<br/>
      <b>Level:</b> {this.level}<br />
      <b>Ability Points:</b>
      <ul>  
        <li>Strength: {Meteor.user().profile.stats.strength}</li>
        <li>Dexterity: {Meteor.user().profile.stats.dex}</li>
        <li>Constitution: {Meteor.user().profile.stats.constitution}</li>
        <li>Intelligence: {Meteor.user().profile.stats.intelligence}</li>
        <li>Wisdom: {Meteor.user().profile.stats.wisdom}</li>
        <li>Charisma: {Meteor.user().profile.stats.charisma}</li>
      </ul>
      </div>
      <div className="col-9">
        <PartyChat />
      </div>
      <div className="col-3">
        <Generator />
      </div>
      </div>
      </div>
      );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(PartyMember);