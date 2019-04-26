import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class Prompt extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      prompt: "Hit this button again to generate a random prompt for your next game!"
    }

  }

  // Want to print out a line to chat that says what a certain roll was
  onSubmit = e => {
    e.preventDefault();

    Meteor.call("prompts.getPrompt", (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }
        this.setState({
        prompt: res
      });
        console.log(res);
      });

    // make a string to pass the chat function
    let promptMessage = "New Prompt: " + this.state.prompt;
          Meteor.call("messages.insert", promptMessage, (err, res) => {
          if (err) {
            alert("There was error inserting check the console");
            // console.log(err);
            return;
          }
     });
  }

  render() {
    return (
       <div className="container">
       
              <div className="card-body">
                <form
                  className="form-signin"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                  <button
                    type="submit"
                    className="btn btn-lg btn-dark text-uppercase"
                  >
                    Generate Prompt
                  </button>
                </form>

        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
    // roll: this.state.roll
  };
})(Prompt);