import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DungeonMaster from "./DungeonMaster.jsx";
import PartyMember from "./PartyMember.jsx";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.avatar = "";
    this.role = "";

    console.log(props);
    console.log(Meteor.user());
    // this.user = Meteor.user();
  }

  // componentDidMount() {
  //   if (Meteor.userId()) {
  //     this.name = this.user.username;
  //     // this.avatar = Meteor.user().profile.avatar;
  //     // this.role = Meteor.user().profile.role;
  //   }
  // }


  render() {
    return (
      <div>
      <div className="container valign-wrapper">
      <div className="row">
      <div className="col s12 center-align">
      <h4><b>Hey there, {Meteor.user() ? Meteor.user().username : "lllskdj" }</b>!</h4>
      <p className="flow-text grey-text text-darken-1">
      Welcome to your DORQ homepage! 
      </p>
      {this.role === "Dungeon Master" ? <DungeonMaster /> : <PartyMember />}
      </div>
      </div>
      </div>
      </div>
      );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object
};

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Dashboard);