import React, { Component } from "react";
import firebase from "./Firebase.js"; // <--- add this line
import Logo from "../assets/logo.png";

export default class FindWedcast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      castId: null
    };
    this.handleCastIdChange = this.handleCastIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const self = this;

    let castId = this.state.castId.replace("#", "");
    console.log(castId)
    firebase
      .database()
      .ref("feeds/feedNew")
      .child(castId)
      .child("chatInfo")
      .once("value", function(snapshot) {
        const exists = snapshot.val();
        if (exists) {
         self.props.history.push(`cast/${castId}`);
          self.props.setCastId(castId);

        } else {
        }
      });
  }

  handleCastIdChange(event) {
    let text = event.target.value.replace(/\s/g, "");
    if (text.charAt(0) != "#") {
      text = "#" + text;
    }
    console.log(text)
    this.setState({castId: text });
  }
  render() {
    let { castId } = this.state;
    return (
      <div className="login-container">
        <img className="logo" src={Logo} />

        <div className="login-wrapper">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div>
              <p className="welcome">Find a Wedcast</p>
              <p className="get-started">
                Enter the wedding's #CastId
              </p>
            </div>
            <input
              className="name-input"
              type="text"
              placeholder="Enter your name"
              value={this.state.castId}
              onChange={this.handleCastIdChange}
            />
            <input className="submit-name-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
