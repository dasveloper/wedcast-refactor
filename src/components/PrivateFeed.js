import React, { Component } from "react";
import firebase from "./Firebase.js"; // <--- add this line
import Logo from "../assets/logo.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    const self = this;
    event.preventDefault();
    let castId = this.props.castId;
    let user = firebase.auth().currentUser;
    let userObj = { userName: user.displayName, password: self.state.password };
    firebase
      .database()
      .ref(`feeds/feedNew/${castId}/members/${user.uid}`)
      .set(userObj, function(error) {
        if (error) alert("Incorrect password");
        else {
          console.log("grant access");

          self.props.grantAccess();
        }
      });
  }
  render() {
    let { password } = this.state;
    let { castId } = this.props;

    return (
      <div className="login-container">
        <img className="logo" src={Logo} />
        <div className="login-wrapper">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div>
              <p className="welcome">#{castId} is private</p>
              <p className="get-started">Enter the password to view this Wedcast</p>
            </div>
            <input
              className="name-input"
              type="text"
              placeholder="Enter the password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <input className="submit-name-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
