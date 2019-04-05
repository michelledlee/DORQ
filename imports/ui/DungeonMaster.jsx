import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import PartyChat from "./PartyChat.jsx"
import BuildParty from "./BuildParty.jsx";
import Generator from "./Generator.jsx";

class DungeonMaster extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.avatar = "";
    this.role = "";
    this.groupNo = "";
    this.onSubmit = this.onSubmit.bind(this);

    this.tweet = "";
    this.onSubmitTweet = this.onSubmitTweet.bind(this);

    this.state = {
      partyMembers: []
    };
  }

  componentDidMount() {
    Meteor.call("users.getMembers", null, (err, res) => {
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

  onSubmitTweet = e => {
    e.preventDefault();
    console.log(this.tweet.value);

     Meteor.call("tweeter.tweetBot", this.tweet.value, (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
        console.log(res);
      });

      // Meteor.call("twitter.Tweet", this.tweet.value, (err, res) => {
      //   if (err) {
      //     alert("There was error inserting check the console");
      //     console.log(err);
      //     return;
      //   }
      //   console.log(res);
      // });
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
      <div className="col-lg-12" role="main">
        <h1>Hey there, {Meteor.user() ? Meteor.user().username : " no "}!</h1>
      <p><b>You're a Dungeon Master!</b> Wow! Gather your party members by requesting their <b>Unique Player ID,</b> and add it using the form below. Interact with your party via chat, and monitor their dice rolls! What a crazy useful experience!</p>
      <div className="content-section-heading">
        <h2>Current Party</h2>
        </div>
        <p>Look at all these DORQs:</p>
      <div className="container">
      <div className="row">{this.renderthePartyMembers()}</div>
      </div>
      <div className="container">
      <BuildParty />
      </div>
      <h2>Party Chat</h2>
      <div className="row">
      <div className="col-9">
        <PartyChat user={Meteor.user()} />
      </div>
      <div className="col-3">
        <Generator />
      </div>
      <form
        className="form-signin"
        noValidate
        onSubmit={this.onSubmitTweet}
      >
      <h2>Announcements</h2>
        <div className="form-label-group">
          <label htmlFor="name">DM Message</label>
          <input
            id="name"
            type="text"
            ref={input => (this.tweet = input)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark btn-xl"
        >
          Tweet
        </button>
      </form>
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