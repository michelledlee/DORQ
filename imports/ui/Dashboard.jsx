import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DungeonMaster from "./DungeonMaster.jsx";
import PartyMember from "./PartyMember.jsx";


class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.name = "";
		this.avatar = "";
		this.role = "";

		console.log(props);
		console.log(Meteor.user());
		// this.user = Meteor.user();
	}

	// componentDidMount() {
	//   if (Meteor.userId()) {
	//     this.name = this.user.username;
	//     // this.avatar = Meteor.user().profile.avatar;
	//     // this.role = Meteor.user().profile.role;
	//   }
	// }


	render() {
		return (
			<div>
				<header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }}>
					<div className="overlay"></div>
					<div className="container">
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="site-heading">
									<span className="subheading">DASHBOARD</span>
								</div>
							</div>
						</div>
					</div>
				</header>
				{Meteor.user() ? "sugma" : "ligma"}
				<div className="container">

					{Meteor.user()? (
						<div className="col-lg-10 mx-auto">
							<h2>Hey there, {Meteor.user() ? Meteor.user().username : " no "}!</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed turpis magna, varius nec bibendum feugiat, efficitur at nisl. Donec id ullamcorper lorem. Nam efficitur pulvinar lorem. Vestibulum augue eros, blandit quis libero vitae, cursus sodales nibh. Nulla volutpat lorem odio, eget lobortis felis sodales sit amet. Suspendisse lacinia sit amet ante at porta. Fusce nec elit et est rhoncus pellentesque a ut magna. Sed sed orci eget lorem congue fermentum et nec nisi. </p>
							{Meteor.user() && Meteor.user().profile.role === "Dungeon Master" ? <DungeonMaster user={Meteor.user()} /> : <PartyMember user={Meteor.user()}/>}
						</div>
					)
						: <p className="col-lg-10 mx-auto">You are not logged in.</p>
					}

				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	user: PropTypes.object
};

export default withTracker((props) => {
	return {
		user: Meteor.user()
	};
})(Dashboard);