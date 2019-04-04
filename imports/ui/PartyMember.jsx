import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import PartyChat from "./PartyChat.jsx";
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
      <h2>Player Info</h2>
      <div className="row">
      <div className="col-1">
      </div>
      <div className="col-4">
      <img src={this.avatar}alt="my face"/><br />
      <b>ID:</b> {this.id}<br />
      <b>Email:</b> {this.email}<br />
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
        <li>Strength: {this.strength}</li>
        <li>Dexterity: {this.dexterity}</li>
        <li>Constitution: {this.constitution}</li>
        <li>Intelligence: {this.intelligence}</li>
        <li>Wisdom: {this.wisdom}</li>
        <li>Charisma: {this.charisma}</li>
      </ul>
      </div>
      </div>
      <p>
      <div className="content-section-heading text-center">
        <h2>Party Chat</h2>
      </div>
      </p>
      <div className="row">
      <div className="col-9">
        <PartyChat user={Meteor.user()} />
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