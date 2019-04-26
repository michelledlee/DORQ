import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import PartyChat from "./PartyChat.jsx";
import Generator from "./Generator.jsx";

const customStyles = {
	content: {
		// top: "50%",
		// left: "50%",
		// right: "auto",
		// bottom: "auto",
		overflow: "scroll",
		height: "85%",
		// marginRight: "-50%",
		marginBottom: "50px",
		marginTop: "50px"
		// transform: "translate(-50%, -50%)"
	}
};

// Modal.setAppElement(document.getElementById("PartyMember"));

class PartyMember extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
			modalEquipIsOpen: false,
			equipmentURLS: [],
			spells: []
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.openEquipModal = this.openEquipModal.bind(this);
		this.afterOpenEquipModal = this.afterOpenEquipModal.bind(this);
		this.closeEquipModal = this.closeEquipModal.bind(this);

		this.id = this.props.user._id;
		this.name = this.props.user.username;
		this.avatar = this.props.user.profile.avatar;
		this.email = this.props.user.emails[0].address;
		this.role = this.props.user.profile.role;
		this.groupNo = this.props.user.profile.groupNo;
		this.level = this.props.user.profile.level;
		this.charname = this.props.user.profile.name;
		this.strength = this.props.user.profile.stats.strength;
		this.strength = this.props.user.profile.stats.strength;
		this.strength = this.props.user.profile.stats.strength;
		this.dexterity = this.props.user.profile.stats.dexterity;
		this.constitution = this.props.user.profile.stats.constitution;
		this.intelligence = this.props.user.profile.stats.intelligence;
		this.wisdom = this.props.user.profile.stats.wisdom;
		this.charisma = this.props.user.profile.stats.charisma;
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		// this.subtitle.style.color = "#f00";
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	openEquipModal() {
		this.setState({ modalEquipIsOpen: true });
	}

	afterOpenEquipModal() {
		// references are now sync'd and can be accessed.
		// this.subtitle.style.color = "#f00";
	}

	closeEquipModal() {
		this.setState({ modalEquipIsOpen: false });
	}

	componentDidMount() {
		// Meteor.call("dnd.getSpells", null, (err, res) => {
		// 	if (err) {
		// 		alert("Could not get spells");
		// 		console.log(err);
		// 		return;
		// 	}
		// 	this.setState({
		// 		spellsURLS: res
		// 	});
		// 	// console.log(res);
		// });

		Meteor.call("dnd.getEquipment", null, (err, res) => {
			if (err) {
				alert("Could not get equipment");
				console.log(err);
				return;
			}
			this.setState({
				equipmentURLS: res
			});
			// console.log(res);
		});

		Meteor.call("dnd.getSpells", null, (err, results) => {
			if (err) {
				alert("Could not get spells");
				console.log(err);
				return;
			}
			this.setState({
				spells: results
			});
		});
	}

	// getSpells() {
	// 	let JSONofSpells = this.state.spellsURLS;
	// 	// function to parse the spells JSON, search the JSON URL, and add to the array
	// 	// in the component
	// 	Meteor.call("dnd.parseSpells", JSONofSpells, (err, res) => {
	// 		if (err) {
	// 			alert("Could not get individual spells");
	// 			console.log(err);
	// 			return;
	// 		}
	// 		this.setState({
	// 			spells: res
	// 		});
	// 		console.log(res);
	// 	});
	// }

	// populateSpellsArray() {
	// 	let JSONArray = JSON.parse(this.state.spells);
	// 	for (let i = 1; i <= 319; i++) {
	// 	Meteor.call("dnd.getAllSpells", i, (err, res) => {
	// 		if (err) {
	// 			alert("Could not get individual spells");
	// 			console.log(err);
	// 			return;
	// 		}
	// 		JSONArray["spells"].push(res);

	// 		console.log(res);
	// 	});
	// 		}
	// 		this.setState({
	// 			spells: JSON.stringify(JSONArray)
	// 		});
	// }

	renderTheSpells() {
		return this.state.spells.map((s, j) => (
			<div className="card col-4" key={j++}>
				<span>
					<strong>Name:</strong> {s.name}
				</span>
				<span>
					<Link
						// onClick={this.getThatDetail(s.url)}
						// to={s.url}
						to="/Dashboard"
					>
						Full Description
					</Link>
				</span>
			</div>
		));
	}

	renderTheEquipment() {
		return this.state.equipmentURLS.map((w, i) => (
			<div className="card col-4" key={i++}>
				<span>
					<strong>Name:</strong> {w.name}
				</span>
				<span>
					<Link
						// onClick={this.getThatDetail(w.url)}
						// to={w.url}
						to="/Dashboard"
					>
						Full Description
					</Link>
				</span>
			</div>
		));
	}

	// getThatDetail(url) {
	// 	Meteor.call("dnd.getOneSpell", url, (err, results) => {
	// 		if (err) {
	// 			alert("Could not get the spell");
	// 			console.log(err);
	// 			return;
	// 		}
	// 		this.setState({
	// 			spells: results
	// 		});
	// 	});

	// }

	render() {
		return (
			<div className="col-lg-12" role="main">
				<h1>
					Hey there, {Meteor.user() ? Meteor.user().username : " no "}
					!
				</h1>
				<p>
					You're ready to play! Huzzah! Give your{" "}
					<b>Dungeon Master</b> your <b>Unique Player ID</b>, listed
					below, to join a party! <b>Already in a party?</b> Get to
					chatting! Use the built-in generator to select your dice,
					and post your rolls directly to the chat!
				</p>
				<h2>Player Info</h2>
				<div className="row">
					<div className="col-1" />
					<div className="col-4">
						<img src={this.avatar} alt="my face" />
						<br />
						<b>ID:</b> {this.id}
						<br />
						<b>Email:</b> {this.email}
						<br />
					</div>
					<div className="col-1" />
					<div className="col-4">
						<b>Character Name:</b> {this.charname} <br />
						<b>Class:</b> {this.role}
						<br />
						<b>Status:</b>{" "}
						{this.groupNo != "" ? "Active" : "Not Active"}
						<br />
						<b>Level:</b> {this.level}
						<br />
						<b>Ability Points:</b>
						<ul>
							<li>Strength: {this.strength}</li>
							<li>Dexterity: {this.dexterity}</li>
							<li>Constitution: {this.constitution}</li>
							<li>Intelligence: {this.intelligence}</li>
							<li>Wisdom: {this.wisdom}</li>
							<li>Charisma: {this.charisma}</li>
						</ul>
						<b>Equipment:</b>{" "}
						<button
							className="btn btn-dark text-uppercase"
							onClick={this.openEquipModal}
						>
							Select
						</button>
						<br />
						<b>Spells:</b>{" "}
						<button
							className="btn btn-dark text-uppercase"
							onClick={this.openModal}
						>
							Select
						</button>
						<br />
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={customStyles}
							contentLabel="Example Modal"
							ariaHideApp={false}
						>
							<h2 ref={subtitle => (this.subtitle = subtitle)}>
								List of Spells
							</h2>
							<button
								className="btn btn-dark text-uppercase"
								onClick={this.closeModal}
							>
								close
							</button>
							{this.renderTheSpells()}
						</Modal>
						<Modal
							isOpen={this.state.modalEquipIsOpen}
							onAfterOpen={this.afterOpenEquipModal}
							onRequestClose={this.closeEquipModal}
							style={
								/*"overflow-y: scroll; max-height:85%;  margin-top: 50px; margin-bottom:50px;"*/
								customStyles
							}
							contentLabel="Example Modal"
							ariaHideApp={false}
						>
							<h2 ref={subtitle => (this.subtitle = subtitle)}>
								List of Equipment
							</h2>
							<button
								className="btn btn-dark text-uppercase"
								onClick={this.closeEquipModal}
							>
								close
							</button>
							{this.renderTheEquipment()}
						</Modal>
					</div>
				</div>
				<h2>Party Chat</h2>
				<div className="row">
					<div className="col-9">
						<PartyChat user={Meteor.user()} />
					</div>
					<div className="col-3">
						<Generator />
					</div>
				</div>
			</div>
		);
	}
}

PartyMember.propTypes = {
	spellsURLS: PropTypes.arrayOf(PropTypes.object),
	equipmentURLS: PropTypes.arrayOf(PropTypes.object)
};

export default withTracker(() => {
	return {
		user: Meteor.user()
	};
})(PartyMember);