import React, { Component } from "react";
import firebase from "./Firebase.js"; // <--- add this line

import Logo from "../assets/logo.png";
import Apple from "../assets/apple.svg";
import AppleBlack from "../assets/apple-black.svg";
import Play from "../assets/play.svg";
import Phone from "../assets/phone372x760.png";
import Hero from "../assets/hero-web.jpg";
import WalkthroughSignup from "../assets/walkthrough-signup.jpg";
import WalkthroughPhotos from "../assets/walkthrough-photos.jpg";
import WalkthroughLaptop from "../assets/walkthrough-laptop.jpg";
import WalkthroughProjector from "../assets/walkthrough-projector.jpg";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      success: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    const email = this.state.email;
    if (!this.validateEmail(email)){
      this.setState({
        success: "",
        error: "Invalid email address"
      });
      return;
    }
  
    firebase
      .database()
      .ref("emails")
      .push({ email: email, type: 'beta' }, function(error) {
        if (error)
          self.setState({
            success: "",
            error: "Email not submitted, please try again"
          });
        else {
          self.emailInput.value = "";
          self.setState({
            success: "Email submitted successfully",
            error: "",
            email: null
          });
        }
      });
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  render() {
    let { success, error } = this.state;
    return (
      <div>
        <div className="hero">
          <div className="hero-bg" />
          <div className="hero-left">
            <div className="hero-inner">
              <img className="hero-logo" src={Logo} />
              <p className="hero-tagline">
                Let your guests be the photographers and capture every moment of
                your special day.
              </p>
              <div className="ios-appstore-wrapper">
                <img className="ios-appstore" src={Apple} />
                <a className="ios-appstore-text" href ="https://itunes.apple.com/us/app/wedcast/id1407471155?ls=1&mt=8">
                  Available on the <span>AppStore</span>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <img className="phone-img" src={Phone} />
          </div>
        </div>
        <section className="intro">
          <p>
            Wedcast is a photo sharing app designed to make your special day
            even more special by putting your guests in charge of the
            photography. No more displosable cameras, our easy to use app allows
            everyone to participate.
          </p>

          <br />
          <br />

          <a className="find-wedcast" href="cast">
            Find a Wedcast
          </a>
        </section>
        <section className="beta">
          <h3>We're looking for beta testers!</h3>
          {success != "" && <p className="success-message">{success}</p>}
          {error != "" && <p className="error-message">{error}</p>}
          <form id="ph-email-form" onSubmit={this.handleSubmit}>
            <input
              ref={el => (this.emailInput = el)}
              type="email"
              name="email"
              id="ph-email"
              placeholder="Email Address"
              required
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              type="submit"
              value="Submit"
              name="subscribe"
              id="ph-subscribe-button"
            />
          </form>
          <div className="how-it-works">
            <h4>How it works:</h4>

            <ol className="beta-instructions">
              <li>Submit you email above</li>
              <li>
                You will be sent an invitation to join our beta test on the
                TestFlight app
              </li>
              <li>
                Play around in our early access Wedcast app and online interface
                before it goes live
              </li>
              <li>
                Report any bugs you find through TestFlight or email us at{" "}
                <a href="mailto:beta@wedcast.app">beta@wedcast.app</a>
              </li>
            </ol>
          </div>
        </section>
        <section className="feature">
          <div className="feature-left">
            <h3 className="feature-header">Save your memories</h3>
            <p className="feature-text">
              You and your guests can conveiently download all of your wedding
              pictures straight to your phone or computer.
            </p>
          </div>
          <div className="feature-right">
            <img
              className="feature-image"
              src={WalkthroughPhotos}
            />
          </div>
        </section>
        <section className="feature">
          <div className="feature-right">
            <img
              className="feature-image"
              src={WalkthroughLaptop}
            />
          </div>
          <div className="feature-left">
            <h3 className="feature-header">Can't make the wedding?</h3>
            <p className="feature-text">
              Photos taken at the wedding will be livestreamed to your unique
              Wedcast url allowing you and your guests to watch the event live
              from any device.
            </p>
          </div>
        </section>
        <section className="feature">
          <div className="feature-left">
            <h3 className="feature-header">Project your Wedcast</h3>
            <p className="feature-text">
              Connect a projector at your wedding venue to your Wedcast url and
              you will be able to see your guest's photos live as they are
              taken.
            </p>
          </div>
          <div className="feature-right">
            <img
              className="feature-image"
              src={WalkthroughProjector}
            />
          </div>
        </section>
        <section className="email">
          <h2 className="email-address">Email: support@wedcast.app</h2>
        </section>
      </div>
    );
  }
}
