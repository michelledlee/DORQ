import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";

class Register extends Component {
  constructor(props) {
    super(props);

    this.name = "";
    this.password = "";
    this.password2 = "";
    this.avatar = "";
    this.charname = "";
    this.role = "";
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();

    // check password is valid
    if (this.password.value === this.password2.value) {

      // set the user avatar
      let avatarURL = "https://api.adorable.io/avatars/285/" + this.name.value

      let userData; 

      // if the person is a DM
      if (this.role.value === "Dungeon Master") {
        // start a group
        let groupIDrand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        
        // our info all in one object
        userData = {
          username: this.name.value,
          email: this.email.value,
          password: this.password.value,
          profile: {
            avatar: avatarURL,
            role: this.role.value,
            groupID: groupIDrand,
            name: "Dungeon Master",
            level: 100,
            members: [String],
            stats: {
              strength: 0,
              dexterity: 0,
              constitution: 0,
              intelligence: 0,
              wisdom: 0,
              charisma: 0,
              hp: 0
            }
          }
        }

      } else {
        let expression = this.role.value;
        let abilityStats;
        // they are not a DM, use default profile
        switch(expression) {
          case "Barbarian":
            abilityStats = {
              strength: 3,
              dexterity: 1,
              constitution: 2,
              intelligence: 1,
              wisdom: 1,
              charisma: 0,
              hp: 14
            }
            break;
          case "Bard":
            abilityStats = {
              strength: 1,
              dexterity: 2,
              constitution: 2,
              intelligence: 1,
              wisdom: 0,
              charisma: 3,
              hp: 10
            }
            break;
          case "Cleric":
            abilityStats = {
              strength: 2,
              dexterity: -1,
              constitution: 2,
              intelligence: 0,
              wisdom: 3,
              charisma: 1,
              hp: 11
            }
            break;
          case "Druid":
            abilityStats = {
              trength: 0,
              dexterity: 1,
              constitution: 3,
              intelligence: -1,
              wisdom: 5,
              charisma: 2,
              hp: 10
            }
            break;
          case "Fighter":
            abilityStats = {
              strength: 3,
              dexterity: -1,
              constitution: 2,
              intelligence: 0,
              wisdom: 1,
              charisma: 2,
              hp: 12
            }
            break;
          case "Monk":
            abilityStats = {
              strength: 1,
              dexterity: 2,
              constitution: 1,
              intelligence: 0,
              wisdom: 2,
              charisma: 0,
              hp: 9
            }
            break;
          case "Paladin":
            abilityStats = {
              strength: 5,
              dexterity: -1,
              constitution: 2,
              intelligence: 0,
              wisdom: 1,
              charisma: 2,
              hp: 12
            }
            break;
          case "Ranger":
            abilityStats = {
              strength: 1,
              dexterity: 5,
              constitution: 1,
              intelligence: 0,
              wisdom: 2,
              charisma: 0,
              hp: 9
            }
            break;
          case "Rogue":
            abilityStats = {
              strength: -1,
              dexterity: 3,
              constitution: 1,
              intelligence: 1,
              wisdom: 0,
              charisma: 3,
              hp: 9
            }
          case "Sorceror":
            abilityStats = {
              strength: -1,
              dexterity: 1,
              constitution: 2,
              intelligence: 0,
              wisdom: 1,
              charisma: 3,
              hp: 8
            }
            break;       
          case "Warlock":
            abilityStats = {
              strength: 0,
              dexterity: 2,
              constitution: 2,
              intelligence: 3,
              wisdom: 1,
              charisma: -1,
              hp: 8
            }
            break; 
          case "Wizard":
            abilityStats = {
              strength: 0,
              dexterity: 2,
              constitution: 2,
              intelligence: 3,
              wisdom: 1,
              charisma: -1,
              hp: 8
            }
            break;
          default:
          abilityStats = {
              strength: 1,
              dexterity: 1,
              constitution: 1,
              intelligence: 1,
              wisdom: 1,
              charisma: 1,
              hp: 9
            }
            break;
        }

      // our info all in one object
        userData = {
          username: this.name.value,
          email: this.email.value,
          password: this.password.value,
          profile: {
            avatar: avatarURL,
            role: this.role.value,
            groupID: "",
            name: this.charname.value,
            level: 1,
            stats: abilityStats
          }
        }
      }
      
      let that = this;
    Accounts.createUser(userData, function(error) {
        if (!error) {

           // redirect to dashboard
           that.props.history.push("/dashboard");
        } else {
           console.log("err: " + error.reason);
        }
     });

    } else {
      console.log("password doesn't match");
    }

  }

  render() {
    return (
       <div className="container">
        <div className="row">
          <div className="sizebox col-lg-10 col-xl-9 mx-auto">
          <h1>Reigister for DORQ!</h1>
            <div className="card card-signin flex-row my-5">
              <div className="card-img-left d-none d-md-flex col-6" />
              <div className="card-body">

                <p>
                  Already have an account? <Link to="/login">Log in!</Link>
                </p>
                <form
                  className="form-signin"
                  noValidate
                  onSubmit={this.onSubmit}
                >
                <label><b>User Information</b></label>
                  <div className="form-label-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      ref={input => (this.name = input)}
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      type="email"
                      ref={input => (this.email = input)}
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="password">Password</label>

                    <input
                      id="password"
                      type="password"
                      ref={input => (this.password = input)}
                    />
                  </div>

                  <div className="form-label-group">
                    <label htmlFor="password2">Confirm Password</label>

                    <input
                      id="password2"
                      type="password"
                      ref={input => (this.password2 = input)}
                    />
                  </div>

                <label><b>Character Basics</b></label>
                  <div className="form-label-group">
                    <label htmlFor="charname">Character Name</label>
                    <input
                      id="charname"
                      type="text"
                      ref={input => (this.charname = input)}
                    />
                  </div>
                  <div className="form-label-group">
                  <label htmlFor="optionsselect">Choose Role</label>
                  <select 
                    className="form-control" 
                    id="optionsselect"
                    ref={input => (this.role = input)}>
                    <option>Dungeon Master</option>
                    <option>Barbarian</option>
                    <option>Bard</option>
                    <option>Cleric</option>
                    <option>Druid</option>
                    <option>Fighter</option>
                    <option>Monk</option>
                    <option>Paladin</option>
                    <option>Ranger</option>
                    <option>Rogue</option>
                    <option>Sorceror</option>
                    <option>Warlock</option>
                    <option>Wizard</option>
                  </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark btn-xl"
                  >
                    Sign up
                  </button>
                </form>
              </div>
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
})(withRouter(Register));