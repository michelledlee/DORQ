import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Generator from "./Generator.jsx";

class PartyMember extends Component {
  constructor(props) {
    super(props);

    this.id = this.props.user._id;
    this.name = this.props.user.username;
    this.avatar = this.props.user.avatar;
    this.role = this.props.user.profile.role;
    this.groupNo = this.props.user.profile.groupNo;
    this.level = this.props.user.profile.level;
    this.charname = this.props.user.profile.name;
    this.strength = this.props.user.profile.stats.strength;
    this.strength = this.props.user.profile.stats.strength;
    this.strength = this.props.user.profile.stats.strength;
    this.dexterity = this.props.user.profile.stats.dexterity;
    this.constitution = this.props.user.profile.stats.constitution;
    this.intelligence = this.props.user.profile.stats.intelligence;
    this.wisdom = this.props.user.profile.stats.wisdom;
    this.charisma = this.props.user.profile.stats.charisma;

  }

  // componentDidMount() {
  //   if (Meteor.user()) {
  //     this.id = Meteor.user()._id;
  //     this.name = Meteor.user().username;
  //     this.email = Meteor.user().email;
  //     this.avatar = Meteor.user().profile.avatar;
  //     this.role = Meteor.user().profile.role;
  //     this.groupNo = Meteor.user().profile.groupID;
  //     this.level = Meteor.user().profile.level;
  //   }
  // }

  render() {
    return (
      <div>
      <p>My Info</p>
      <img src={this.avatar} alt="my face"/><br />
      ID: {this.id}<br />
      Email: {this.email}<br />
      <p>My Character
      Name: {this.name} <br/>
      Class: {this.role}<br/>
      Status: {this.groupNo != "" ? "Active" : "Not Active"}<br/>
      Level: {this.level}<br />
      Ability Points:</p>
      <ul>  
        <li>Strength: {this.strength}</li>
        <li>Dexterity: {this.dexterity}</li>
        <li>Constitution: {this.constitution}</li>
        <li>Intelligence: {this.intelligence}</li>
        <li>Wisdom: {this.wisdom}</li>
        <li>Charisma: {this.charisma}</li>
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