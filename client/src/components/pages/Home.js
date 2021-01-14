import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import { post, get } from "../../utilities";

class Home extends Component {
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
            {!this.props.userId && <Redirect to={"/"} noThrow/>}
            <GoogleLogout
              clientId={this.props.googleClientId}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
            /> 
            
            <div>
              yo 
            </div>
            <button 
                type="submit"
                value="Submit"
                onClick={this.handleSubmit}
            >
                 Add bookmark
            </button>
            <div>
                {JSON.stringify(this.state.bookmarks)}
            </div>
        </>
      );
    }
  }
  
  export default Home;