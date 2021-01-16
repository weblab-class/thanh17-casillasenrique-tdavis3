import React, {Component} from "react";
import {GoogleLogout} from "react-google-login";
import {Redirect} from "@reach/router";
import {post, get} from "../../utilities";
import Bookmark from "../modules/Bookmark";
import { Button, Grid, Image } from "semantic-ui-react";
import Group from "../modules/Group";
import NewBookmarkForm from "../modules/NewBookmarkForm";
import NewComponentModal from "../modules/NewComponentModal";
import EditBar from "../modules/EditBar";
import "./Home.css";
class Home extends Component {
    constructor(props) {
        super(props);
        // Initialize Default State
        this.state = {
            groups: [],
            bookmarks: [],
            inEditMode: false,
        };
    }

    componentDidMount() {
        // remember -- api calls go here!
        get("/api/title/bookmarks").then((bookmarks) => {
            let reversedBookmarks = bookmarks.reverse();
            reversedBookmarks.map((bookmark) => {
                this.setState({bookmarks: this.state.bookmarks.concat([bookmark])});
            });
        });
    }

    handleSubmit = ({ url, bookmarkName }) => {
        const bookmark = {
            name: bookmarkName,
            url: url,
            image: null,
            group: null
        }

        console.log("sending to api");
        post("/api/title/edit/add_bookmark", bookmark)
            .then((bookmark) => {
                this.state.bookmarks.push(bookmark);
                this.setState({...this.state, bookmarks: this.state.bookmarks});
            });
    };

    handleSubmitGroup = () => {
      const group = {
        userId: String,
        name: String,
        bookmarks: [String]
      }

      console.log("sending group to api")
      post("/api/title/edit/add_group", group)
        .then((group)  =>{
          this.state.groups.push(group);
          this.setState(({...this.state,groups: this.state.groups}));
        });
}
    // filteredBookmarks = this.state.bookmarks.filter((bookmark) =>{
    //   return bookmark.group
    // })
    render() {

        return (
            <div className={"root"}>
                {!this.props.userId && <Redirect to={"/"} noThrow/>}
                <GoogleLogout
                    clientId={this.props.googleClientId}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                />
                <Image src={require("../../images/peepoHappy.png")}></Image>
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
              <button
                type="submit"
                value="Submit"
                onClick={this.handleSubmitGroup}
              >
                Add Group
              </button>
              <EditBar handleSubmit={this.handleSubmit}/>
                <div className={"grid-Home"}>
                  {/*<div className={"content"}>*/}
                  <div className={"group"}>
                    <Group
                      bookmarks={this.state.bookmarks}
                      inEditMode =  {this.state.inEditMode}
                      userId = {this.props.userId}
                    />
                  </div>
                  <div className={"group"}>
                    <Group
                      bookmarks={this.state.bookmarks}
                      inEditMode =  {this.state.inEditMode}
                      userId = {this.props.userId}
                    />
                  </div>

                    {this.state.bookmarks.map((bookmark) => {
                      return <Bookmark
                        userId={this.props.userId}
                        inEditMode={this.state.inEditMode}
                        url={bookmark.url}
                        name={bookmark.name}
                        location={undefined}
                      />
                    })}
                  {/*</div>*/}
                </div>
                <div>
                    {JSON.stringify(this.state.bookmarks)}
                </div>
                <NewComponentModal
                    trigger={<Button>Create Bookmark</Button>}
                    form={<NewBookmarkForm onSubmit={this.handleSubmit}/>}
                />
            </div>
        );
    }
}

export default Home;