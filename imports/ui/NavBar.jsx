import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import Register from "./Register.jsx";

class NavBar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
					<a className="navbar-brand" href="/">
					<img src="img/dice-small.png" alt="a small image of a die"></img>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link to="/">
                  Home <span className="nav-link sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/about">About</Link>
							</li>
							<li className="nav-item">
								<Link to="/dashboard">Dashboard</Link>
							</li>
						</ul>
						{Meteor.user() ? (
							<ul className="navbar-nav mr-auto">

								<li className="nav-item">  <Link to="/" onClick={Meteor.logout}>
                Logout
								</Link></li>
							</ul>
						) : (         <ul className="navbar-nav mr-auto">

							<li className="nav-item">
								<Link to="/register">Register</Link>
							</li>
							<li className="nav-item">
								<Link to="/login">Login</Link>
							</li>
						</ul>
						)}
                         

					</div>
				</nav>
			</div>
		);
	}
}


export default withTracker(() => {
	return {
		user: Meteor.user()
	};
})(NavBar);