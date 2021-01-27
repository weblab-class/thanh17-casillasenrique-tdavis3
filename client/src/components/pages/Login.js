import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "@reach/router";

import { post, get } from "../../utilities";
import Background from "../../public/images/background3.png";
import "../../utilities.css";
import "./Login.css";
import { init } from "ityped";
const GOOGLE_CLIENT_ID = "896967920126-0399u048v37e7g5v5di98ueh38njq1jt.apps.googleusercontent.com";



class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      bookmarks: [],
    };
  }

  componentDidMount() {
    const myElement = document.querySelector("#myElement");

    init(myElement, {
      showCursor: false,
      typeSpeed:  100,
      disableBackTyping: true,
      strings: ["your bookmarks", "your groups", "your new home :)"]
    });
  }

  /**
   *
   * @returns {JSX.Element} a Rendering of the Login page.
   */
  render() {
    return (
      <div className={"root"} >
        <div className={"title"}>MarcX</div>
        <div className={"description"}><div id="myElement"/></div>

        <div className={"loginButton"}>
          {this.props.userId ? (
            <Redirect to={"/home"} noThrow />
          ) : (
            <GoogleLogin
              className={"google-login-button"}
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
        </div>
        {/*<h1>This is the login page</h1>*/}
        {/*<h2> What we provide in this skeleton</h2>*/}
        {/*<ul>*/}
        {/*  <li>Google Auth (Skeleton.js & auth.js)</li>*/}
        {/*  <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>*/}
        {/*  <li>User Model (auth.js & user.js)</li>*/}
        {/*</ul>*/}
        {/*<h2> What you need to change</h2>*/}
        {/*<ul>*/}
        {/*  <li>Change the font in utilities.css</li>*/}
        {/*  <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>*/}
        {/*  <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>*/}
        {/*  <li>Change the Database SRV for Atlas (server.js)</li>*/}
        {/*  <li>Change the Database Name for MongoDB (server.js)</li>*/}
        {/*  <li>Add a favicon to your website at the path client/dist/favicon.ico</li>*/}
        {/*  <li>Update website title in client/dist/index.html</li>*/}
        {/*</ul> */}
      </div>
    );
  }
}

export default Login;
