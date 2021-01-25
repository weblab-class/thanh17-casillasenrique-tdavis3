import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";
const GOOGLE_CLIENT_ID = "896967920126-0399u048v37e7g5v5di98ueh38njq1jt.apps.googleusercontent.com";
import { del, get, post, readFileAsync } from "../utilities";
import Background from "../public/images/background.jpg";
// import 'bootstrap/dist/css/bootstrap.min.css';

import "../utilities.css";

import { socket } from "../client-socket.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      backgroundImage: undefined,
      isDarkMode: true,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        console.log("already logged in");
        console.log("user settings are: isDarkMode: " + user.isDarkMode + " \nbackgroundimage," + user.backgroundImage + " \n") ;
        this.setState({ userId: user._id, backgroundImage: user.backgroundImage, isDarkMode: user.isDarkMode });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      console.log("user settings are: isDarkMode: " + user.isDarkMode + " \nbackgroundimage," + user.backgroundImage + " \n") ;
      this.setState({ userId: user._id, backgroundImage: user.backgroundImage, isDarkMode: user.isDarkMode });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  handleEditSettings = async (imageFileObject, isDarkMode) => {
    console.log(isDarkMode);
    let savedFile = this.state.backgroundImage;
    if (imageFileObject) {
      savedFile = await readFileAsync(imageFileObject);   
    } 

    this.setState({ ...this.state, backgroundImage: savedFile, isDarkMode: isDarkMode});

    post("/api/edit/settings", {backgroundImage: savedFile, isDarkMode: isDarkMode}).then(result => {
      console.log("result " + Object.keys(result) + " " + Object.values(result));
      
    }).catch(e => console.log("error occurred: " + e));
  };

  render() {
    return (
      <>
        <Router>
          <Login
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Home
            path="/home"
            handleLogout={this.handleLogout}
            googleClientId={GOOGLE_CLIENT_ID}
            userId={this.state.userId}
            backgroundImage={this.state.backgroundImage}
            isDarkMode={this.state.isDarkMode}
            handleEditSettings={this.handleEditSettings}
          />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
