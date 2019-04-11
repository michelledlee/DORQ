import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


// This class displays relevant D&D news
class News extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    Meteor.call("tweeter.printTweets", (err, res) => {
      console.log(res);
      if (err) {
        alert("Could not get Tweets");
        console.log(err);
        return;
      }
    });
  }

  onSubmit() {
    event.preventDefault();

    Meteor.call("tweeter.printTweets", (err, res) => {
      if (err) {
        alert("Could not get Tweets");
        console.log(err);
        return;
      } else {
        console.log(res);
        return res.map((res, i) => (
          <div className="card col-4" key={res.id}>
          <span>
          <strong>Author:</strong> {res.user.screen_name}
          </span>
          <span>
          <strong>Date:</strong> {res.created_at}
          </span>
          <span>
          <strong>Tweet:</strong> {res.user.description}
          </span>
          </div>
          ));
      }
    });
    // window.location.reload(); 
  }

  renderTweets(response) {
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
        }
      }
    }


    render() {
      return (
        <div>
        <header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }} role="banner">
        <div className="overlay"></div>
        <div className="container">
        <div className="col-lg-8 col-md-10 mx-auto">
        <div className="site-heading">
        <span className="subheading">NEWS</span>
        </div>
        </div>
        </div>
        </header>
        <div className="container" role="main" >
        <div className="col-lg-10 mx-auto">
        <h1>#DungeonsAndDragons News from Twitter</h1>
        <button
        type="submit"
        className="btn btn-xl btn-dark text-uppercase"
        onSubmit={this.onSubmit.bind(this)}
        >
        Refresh
        </button>
        </div>
        <p className="text-muted small mb-0">
        Copyright &copy; DORQ 2019
        </p>
        </div>
        </div>
        )
    }

  }


// News.propTypes = {
// }


export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(withRouter(News));