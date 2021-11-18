import React from "react";
import { AuthRoute } from "./util/route_util";
import { Switch } from "react-router";
import NavBarContainer from "./components/nav_bar/nav_bar_container";
import LoginFormContainer from "./components/session/login_form_container";
import SignupFormContainer from "./components/session/signup_form_container";
import "antd/dist/antd.css";
import "./assets/stylesheets/application.scss";
import EventShowContainer from "./components/event/event_show_container";
import MainPageContainer from "./components/main/main_page_container";


const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/events/:eventId" component={EventShowContainer} />
    </Switch>
  </div>
);

export default App;
