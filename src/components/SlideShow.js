import ImageGallery from "react-image-gallery";
import firebase from "./Firebase.js"; // <--- add this line
import React, { Component } from "react";
import Gallery from "react-grid-gallery";
import Ring from "../assets/ring.png";
import Logo from "../assets/logo.png";

class SlideShow extends Component {
  constructor() {
    super();
    this.state = {
      slideshowImages: null,
      galleryImages: null,
      view: 2,
      castId: null,
      password: null,
      width: null,
      height: null,
      showMenu: false,
      timeout: null,
      infoVisisble: true
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.switchViews = this.switchViews.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount() {
    this.getImages();
    this.getPassword();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  getPassword() {
    var self = this;
    let { castId } = this.props;
    const itemsRef = firebase
      .database()
      .ref(`feeds/feedNew/${castId}/password`);
    itemsRef.once("value", snapshot => {
      const password = snapshot.val();
      self.setState({
        password
      });
    });
  }
  getImages() {
    var self = this;
    let { castId } = this.props;
    const itemsRef = firebase.database().ref(`feeds/feedNew/${castId}/uploads`);
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();

      let SlideshowImages = [];
      let GalleryImages = [];
      for (let item in items) {
        SlideshowImages.push({
          original: items[item].uri,
          thumbnail: items[item].uri
        });
        let ratio = items[item].width / items[item].height;
        let height = this.state.height / 3;
        let width = ratio * height;

        GalleryImages.push({
          src: items[item].uri,
          thumbnail: items[item].uri,
          thumbnailWidth: width,
          thumbnailHeight: height
        });
      }
      self.setState({
        galleryImages: GalleryImages,
        slideshowImages: SlideshowImages
      });
    });
  }
  switchViews() {
    if (this.state.view == 1) {
      this.setState({ view: 2 });
    } else {
      this.setState({ view: 1 });
    }
  }
  toggleInfo() {
    this.setState({ infoVisisble: !this.state.infoVisisble });
  }

  render() {
    let {
      galleryImages,
      showMenu,
      slideshowImages,
      view,
      currentUser,
      infoVisisble,
      password
    } = this.state;
    let { castId } = this.props;
    const width = this.state.width;

    return (
      <div className="gallery-bg" >
        {slideshowImages &&
          view == 1 && (
            <ImageGallery showThumbnails={false} items={slideshowImages} />
          )}
        {galleryImages &&
          view == 2 && (
            <Gallery enableImageSelection={false} images={galleryImages} />
          )}

        <div className={"overlay-wrapper " + (showMenu ? "show" : "hidden")}>
          <div className="menu-toggle" onClick={()=>    this.setState({ showMenu: !this.state.showMenu })}>
            <img className="menu-toggle-ring" src={Ring} />
          </div>
          <img className="menu-logo" src={Logo} />

          <button className="menu-button" onClick={this.switchViews}>
            {view == 2 ? "View Slideshow" : "View Gallery"}
          </button>
          <button className="menu-button" onClick={this.toggleInfo}>
            {infoVisisble ? "Hide cast info" : "Show cast info"}
          </button>
        </div>
        {infoVisisble && (
          <div className="feed-info">
            <p>#CastID: {castId}</p>
            <p>Password: {password}</p>
          </div>
        )}
      </div>
    );
  }
}
export default SlideShow;
