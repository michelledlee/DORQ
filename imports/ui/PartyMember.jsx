import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";


class PartyMember extends Component {
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
      </div>
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