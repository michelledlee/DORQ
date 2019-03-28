import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

import BuildParty from "./BuildParty.jsx";

export default class DungeonMaster extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.avatar = "";
    this.role = "";
    this.groupNo = "";
  }

  componentDidMount() {
    if (Meteor.user()) {
      this.name = Meteor.user().username;
      this.avatar = Meteor.user().profile.avatar;
      this.role = Meteor.user().profile.role;
      this.groupNo = Meteor.user().profile.groupID;
    }
  }

  render() {
    return (
      <div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align" style={{padding:"100px"}}>
      {Meteor.user().profile.size === 0 ? <BuildParty id={this.groupNo} /> :  <p>normal profile</p>}
      </div>
      </div>
      </div>
      </div>
      );
  }
}