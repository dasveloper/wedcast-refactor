import React, { Component } from "react";
import firebase from "./Firebase.js"; // <--- add this line
import Logo from "../assets/logo.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    const self = this;
    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .catch(function(error) {})
      .then(function(user) {
        var user = firebase.auth().currentUser;

        if (user != null) {
          user
            .updateProfile({
              displayName: self.state.name
            })
            .then(function() {})
            .catch(function(error) {});
        }
      });
  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    let { name } = this.state;
    return (
      <div className="login-container">
        <img className="logo" src={Logo} />

        <div className="login-wrapper">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div>
              <p className="welcome">Welcome to Wedcast</p>
              <p className="get-started">
                To get started we'll just need your name.
              </p>
            </div>
            <input
              className="name-input"
              type="text"
              placeholder="Enter your name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <input className="submit-name-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
