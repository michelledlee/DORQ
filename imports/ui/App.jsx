import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import NavBar from "./NavBar.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";



const HomeComponent = () => {
  return (
  <div>
  <header className="masthead" style={{  backgroundImage: "url(" + "img/dice.jpg" + ")" }}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>DORQ</h1>
            <span className="subheading">aka d&d&me</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div className="container">
      {Meteor.user() ? <p>sugma</p> : <p>ligma</p>}
      <p className="text-muted small mb-0">
        Copyright &copy; DORQ 2019
      </p>
    </div>
    </div>
    );
};

const AboutComponent = () => (
  <div>
    <header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }}>
    <div className="overlay"></div>
    <div className="container">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <span className="subheading">ABOUT</span>
        </div>
      </div>
    </div>
  </header>
  <div className="container">
              <span className="subheading">About D&D & Me</span>
    <p className="text-muted small mb-0">
      Copyright &copy; DORQ 2019
    </p>
    </div>
  </div>
);

const RegisterComponent = () => (
  <div>
    <header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }}>
    <div className="overlay"></div>
    <div className="container">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
              <span className="subheading">REGISTER</span>
          </div>
      </div>
    </div>
  </header>
      <Register />
    <p className="text-muted small mb-0">
      Copyright &copy; DORQ 2019
    </p>
  </div>
);

const LoginComponent = () => (
  <div>
    <header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }}>
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <span className="subheading">LOGIN</span>
          </div>
        </div>
      </div>
    </div>
  </header>
      <Login />
    <p className="text-muted small mb-0">
      Copyright &copy; DORQ 2019
    </p>
  </div>
);


const NotFoundPage = () => (
  <div>
    <h2>Page not found</h2>
    <div>SUHAS HELP</div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/register" component={RegisterComponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);