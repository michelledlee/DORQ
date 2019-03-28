import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import PartyRSVP from "./PartyRSVP.js";

class BrowseParties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parties: []
    };
  }

  getAllParties() {
      Meteor.call("parties.get", null, (err, res) => {
      if (err) {
        alert("There was an error getting");
        console.log(err);
        return;
      }
      this.setState({
        events: res
      });
      console.log(res);
    });
  }

  renderParties() {
    return this.state.parties.map((party, i) => <PartyRSVP key={i++} party={party} />);
  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" style={{ padding: "100px" }}>
            <p>Choose your party:</p>

            <div className="row">{this.renderParties()}</div>

            <Logout />
          </div>
        </div>
      </div>
    );
  }
}

BrowseParties.propTypes = {
  parties: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("parties");
  return {
    parties: Parties.find({}).fetch(),
    user: Meteor.user(),
    ready: handle.ready()
  };
})(BrowseParties);