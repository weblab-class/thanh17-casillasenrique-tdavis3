import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "@reach/router";


import { post, get } from "../../utilities";

import "../../utilities.css";

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
    // remember -- api calls go here!
    get("/api/title/links").then((bookmarks) => {
      let reversedBookmarks = bookmarks.reverse();
      reversedBookmarks.map((bookmark) => {
        this.setState({ bookmarks: this.state.bookmarks.concat([bookmark]) });
      });
    });
  }

  handleSubmit = (event) => {
    const bookmark = {
      name: "First bookmark!",
      url: "google.com",
      image: null, 
    }

    console.log("sending to api");
    post("/api/title/edit/add_bookmark", bookmark)
      .then((bookmark) => {
        this.state.bookmarks.push(bookmark);
        this.setState({ ...this.state, bookmarks: this.state.bookmarks });
      });
  };

  render() {
    return (
      <>     
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
        <h1>This is the login page</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>Change the font in utilities.css</li>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
          <li>Update website title in client/dist/index.html</li>
        </ul> 

      </>
    );
  }
}

export default Login;
