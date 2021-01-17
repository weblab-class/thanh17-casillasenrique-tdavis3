import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "@reach/router";


import { post, get } from "../../utilities";

import "../../utilities.css";
import "./Login.css"
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Login extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      bookmarks: [],
    };
  }

  componentDidMount() {
  }

  render() {
    return (

      <div className={"root"}>
        <div className={"title"}>
          MarkX
        </div>
        <div className={"description"}>
            This is our home now.
        </div>
        <div className={"loginButton"}>
        {this.props.userId ? (   
          <Redirect to={'/home'} noThrow/>
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
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
