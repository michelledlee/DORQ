import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PartyChat from "./PartyChat.jsx"
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
      <div className="col-lg-10 mx-auto">
      <h2>Hey there, {Meteor.user().username}!</h2>
      <p>Welcome to your DORQ homepage! 
      {this.role === "Dungeon Master" ? <DungeonMaster /> : <PartyMember />}
      <PartyChat />
      </p>
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