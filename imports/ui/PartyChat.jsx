import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";

class PartyChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  renderMessages() {
    return this.props.messages.map(m=>
      <div className="card" key={m._id}><div>        
      <img
          className="icon bg-light rounded"
          width="48"
          height="48"
          src={`https://api.adorable.io/avatars/48/${m.owner.toLowerCase()}@adorable.io.png`}
          alt={m.owner}
        />
        <b>{m.owner}:</b> {m.message}</div></div>);
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
        <div id="messages">{this.renderMessages()}</div>
        <label className="fixlabel" htmlFor="inMessage">
          <input
            className="fixlabel form-control"
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
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker((props) => {
  const handle = Meteor.subscribe("messages");
  const thisGroup = props.user.profile.groupID;
  return {
    messages: Messages.find({group: thisGroup}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(PartyChat);












