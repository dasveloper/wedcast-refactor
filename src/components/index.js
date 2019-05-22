import React, { Component } from "react";
import firebase from "./Firebase.js"; // <--- add this line
import ReactGA from "react-ga";
import { SocialIcon } from "react-social-icons";

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
      email: null,
      error: null,
      success: null
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    ReactGA.initialize("UA-125543449-1");
    ReactGA.pageview(window.location.hash);
  }
  trackIosClick() {
    ReactGA.event({
      category: "InstallClickIos",
      action: "Clicked iOS Download"
    });
  }
  trackIosClickLower() {
    ReactGA.event({
      category: "InstallClickIosLower",
      action: "Clicked lower iOS Download"
    });
  }
  trackAndroidClick() {
    ReactGA.event({
      category: "InstallClickAndroid",
      action: "Clicked Android Download"
    });
  }
  trackAndroidClickLower() {
    ReactGA.event({
      category: "InstallClickAndroidLower",
      action: "Clicked Android Download"
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const self = this;
    const email = this.state.email;
    if (!this.validateEmail(email)) {
      this.setState({
        success: "",
        error: "Invalid email address"
      });
      return;
    }

    firebase
      .database()
      .ref("emails")
      .push({ email: email, type: "newsletter:index" }, function(error) {
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

              <a
                className="ios-appstore-wrapper"
                onClick={() => {
                  this.trackIosClick();
                }}
                href="https://itunes.apple.com/us/app/wedcast/id1407471155?ls=1&mt=8"
              >
                <img className="ios-appstore" src={Apple} />
                <p className="ios-appstore-text">
                  Available on the <span>AppStore</span>
                </p>
              </a>
              <a
                className="ios-appstore-wrapper"
                onClick={() => {
                  this.trackAndroidClick();
                }}
                href="   https://play.google.com/store/apps/details?id=com.wedcast"
              >
                <img className="ios-appstore" src={Play} />
                <p className="ios-appstore-text">
                  Get it on <span>Google Play</span>
                </p>
              </a>
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
            photography. No more disposable cameras, our easy to use app allows
            everyone to participate.
          </p>
        </section>

        <div className="lower-hero-wrapper">
          <img className="lower-hero" src={Hero} />
        </div>
        <div className="mission">
          <h3 className="mission-header">Why use Wedcast?</h3>
          <p>
            Here at Wedcast our mission is to provide a stress free and
            enjoyable experience when it comes to taking and managing your
            wedding photos. For that reason, here are our vows to you:
          </p>
          <ul className="vows">
            <li className="vow">
              <h4 className="vow-header">No upsells</h4>
              <p className="vow-details">
                There's no room for suprises on your big day. For that reason we
                believe in upfront pricing. No hidden costs, locked features, or
                degraded quality you will recieve the full experience for one
                low cost.
              </p>
            </li>
            <li className="vow">
              <h4 className="vow-header">No limits</h4>
              <p className="vow-details">
                Unlimited guests. Unlimited photos. Unlimited downloads. Your
                wedding day can be as limitless as your love, with Wedcast you
                will create unlimited memories.
              </p>
            </li>
            <li className="vow">
              <h4 className="vow-header">No ads</h4>
              <p className="vow-details">
                You want your wedding day to be perfect and you will be the
                center of attention. We vow to never distract your guests from
                what really matter with ugly, distracting advertisements.{" "}
              </p>
            </li>
          </ul>
        </div>

        <h3 className="feature-header">Features</h3>

        <section className="feature">
          <div className="feature-right">
            <img
              className="feature-image"
              src={WalkthroughSignup}
            />
          </div>
          <div className="feature-left">
            <h3 className="feature-header">No-hassle signup</h3>
            <p className="feature-text">
              Don't bother with emails and passwords on the big day, your guests
              can join with only a name.
            </p>
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
        <h3 className="download-header">Download now:</h3>

        <section className="appstore-cta-wrapper">
          <a
            className="appstore-cta"
            onClick={() => {
              this.trackIosClickLower();
            }}
            href="https://itunes.apple.com/us/app/wedcast/id1407471155?ls=1&mt=8"
          >
            <img
              className="appstore-cta-icon"
              src={AppleBlack}
            />
            <p className="appstore-cta-text">
              Available on the <span>AppStore</span>
            </p>
          </a>
          <a
            className="appstore-cta"
            onClick={() => {
              this.trackAndroidClickLower();
            }}
            href="https://play.google.com/store/apps/details?id=com.wedcast"
          >
            <img className="appstore-cta-icon" src={Play} />
            <p className="appstore-cta-text">
              Get it on <span>Google Play</span>
            </p>
          </a>
        </section>
        <section className="social">
          <div className="social-inner">
            <SocialIcon
              network="twitter"
              url="https://twitter.com/wedcastapp"
              style={{ height: 60, width: 60 }}
            />
            <SocialIcon
              network="facebook"
              url="https://www.facebook.com/wedcast"
              style={{ height: 60, width: 60 }}
            />
            <SocialIcon
              network="instagram"
              url="https://www.instagram.com/wedcastapp/"
              style={{ height: 60, width: 60 }}
            />
          </div>
        </section>
        <section className="email">
          <h2 className="email-address">Email: support@wedcast.app</h2>
        </section>
        <section className="beta">
          <h3>Subscribe to our newsletter!</h3>

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
          <p>
            Subscribe and recieve latstest Wedcast news as well as all deals and
            promotions.
          </p>
        </section>
      </div>
    );
  }
}
