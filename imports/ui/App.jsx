import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";


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
				<div className="col-lg-10 mx-auto">
					Welcome to DORQ, an app for organizing your D&D parties! Make friends, add them to your groups, and even play your game all in one place. To find out more, register above, or see our About page!
				</div>
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
			<div className="col-lg-10 mx-auto">
				<h2>About D&D & Me</h2>
			</div>
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
		<div className="container">
			<Register />
			<p className="text-muted small mb-0">
          Copyright &copy; DORQ 2019
			</p>
		</div>
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
		<div className="container">
			<Login />
			<p className="text-muted small mb-0">
      Copyright &copy; DORQ 2019
			</p>
		</div>
	</div>
);

// const DashboardComponent = () => (
//   <div>
//     <header className="masthead-baby" style={{  backgroundImage: "url(" + "img/dice-narrow.jpg" + ")" }}>
//     <div className="overlay"></div>
//     <div className="container">
//       <div className="row">
//         <div className="col-lg-8 col-md-10 mx-auto">
//           <div className="site-heading">
//             <span className="subheading">DASHBOARD</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
//   <div className="container">
//       {Meteor.user() ? <Dashboard /> : 
//         <p className="col-lg-10 mx-auto">You are not logged in.</p>}
//       <p className="text-muted small mb-0">
//       Copyright &copy; DORQ 2019
//       </p>
//     </div>
//   </div>
// );


const NotFoundPage = () => (
	<div>
		<h2>Page not found</h2>
		<div>SUHAS HELP</div>
	</div>
);

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         Meteor.user() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

// PrivateRoute.propTypes = {
//   component: PropTypes.func,
//   location: PropTypes.object
// };


class App extends Component {
	// constructor(props) {
	//   super(props);
	// }

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

// App.propTypes = {
//   user: PropTypes.object,
//   loggedIn: PropTypes.bool
// };

export default withTracker(() => {
	// const user = Meteor.user();
	// const userDataAvailable = user !== undefined;
	// const loggedIn = user && userDataAvailable;
	return {
		user: Meteor.user()
		// loggedIn: loggedIn
	};
})(App);