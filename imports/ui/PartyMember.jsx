import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

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
      <p>My Info</p>
      <img src={Meteor.user().profile.avatar} alt="my face"/><br />
      ID: {Meteor.user()._id}<br />
      Email: {Meteor.user().email}<br />
      <p>My Character
      Name: {this.name} <br/>
      Class: {this.role}<br/>
      Status: {this.groupNo != "" ? "Active" : "Not Active"}<br/>
      Level: {this.level}<br />
      Ability Points:</p>
      <ul>  
        <li>Strength: {Meteor.user().profile.stats.strength}</li>
        <li>Dexterity: {Meteor.user().profile.stats.dex}</li>
        <li>Constitution: {Meteor.user().profile.stats.constitution}</li>
        <li>Intelligence: {Meteor.user().profile.stats.intelligence}</li>
        <li>Wisdom: {Meteor.user().profile.stats.wisdom}</li>
        <li>Charisma: {Meteor.user().profile.stats.charisma}</li>
      </ul>
      <p>Link To Chat</p>

      <Generator />
      </div>
      );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(PartyMember);