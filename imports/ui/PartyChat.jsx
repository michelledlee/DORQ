import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";

class PartyChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  renderMessages() {
    return this.props.messages.map(m =>
      <div className="card" key={m._id}><b>{m.owner}:</b> {m.message}</div>);
  }

  onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      message: evt.target.value
    });
  }

  onKey(evt) {
    if (evt.key === "Enter") {

      Meteor.call("messages.insert",
        this.state.message,
        (err, res) => {
          if (err) {
            alert("There was error inserting check the console");
            console.log(err);
            return;
          }

          console.log("Message inserted", res);
          this.setState({
            message: ""
          });
        });
    }
  }

  render() {
    console.log("Messages", this.props.messages);
    return (
      <div className="container">
        <div className="content-section-heading text-center">
        <h2>Party Chat</h2>
        </div>
        <div id="messages">{this.renderMessages()}</div>
        <label htmlFor="inMessage">
          Chat:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter your message"
            value={this.state.message}
            onChange={this.onChange.bind(this)}
            onKeyPress={this.onKey.bind(this)}
          />
        </label>
      </div>
    );
  }
}

PartyChat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("messages");
  return {
    messages: Messages.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(PartyChat);














