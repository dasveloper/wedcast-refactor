import React, { Component } from "react";
import SlideShow from "./SlideShow";
import LoginPage from "./LoginPage";
import PrivateFeed from "./PrivateFeed";
import FindWedcast from "./FindWedcast";

import firebase from "./Firebase.js"; // <--- add this line

export default class Cast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      hasAccess: null,
      castId: null
    };
    this.grantAccess = this.grantAccess.bind(this);
    this.setCastId = this.setCastId.bind(this);

  }

  checkAccess() {
    let self = this;
    const { currentUser } = firebase.auth();
    console.log(`feeds/feedNew/${this.props.match.params.id}/members/${currentUser.uid}`)
    
    firebase
      .database()
      .ref(
        `feeds/feedNew/${this.props.match.params.castId}/members/${currentUser.uid}`
      )
      .once("value", function(snapshot) {

        console.log("has permission");

        self.setState({ hasAccess: true });
      })
      .catch(function(error) {
        var errorCode = error.code;
        if (errorCode === "PERMISSION_DENIED") {
          console.log("no permission");
          self.setState({ hasAccess: false });
        }
      });
  }

  grantAccess() {
    this.setState({ hasAccess: true });
  }
  
  setCastId(castId) {
 
    this.setState({ castId });
  }
  componentDidMount() {
    let self = this;
    let { castId } = this.props.match.params;
    this.setState({ castId });
    window.onpopstate  = (e) => {
      this.setState({castId: null})
      }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
        this.checkAccess();
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    let { loggedIn, hasAccess, castId } = this.state;
    return (
      <div className="cast-wrapper">
        {!castId && (
          <FindWedcast
            history={this.props.history}
            setCastId={this.setCastId}
          />
        )}
        {castId && !loggedIn && <LoginPage castId={castId} />}
        {castId &&
          !hasAccess &&
          loggedIn && (
            <PrivateFeed grantAccess={this.grantAccess} castId={castId} />
          )}
        {castId && loggedIn && hasAccess && <SlideShow castId={castId} />}
      </div>
    );
  }
}
