import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";
import Cast from "./components/Cast";
import index from "./components/index";
import Beta from "./components/beta";

import PrivacyPolicy from "./components/PrivacyPolicy";

const App = ( ) => {
    return (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={index} exact={true}/>
      <Route path="/beta" component={Beta} exact={true}/>
      <Route path="/cast/:castId" component={Cast} />
      <Route path="/cast" component={Cast} />
      <Route path="/privacypolicy" component={PrivacyPolicy}/>

      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
    )
  };
  export default App;
