import React, { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import { post, get } from "../../utilities";
import Bookmark from "../modules/Bookmark";
import { Button, Grid, Image } from "semantic-ui-react";
import Group from "../modules/Group";
import NewBookmarkForm from "../modules/NewBookmarkForm";
import NewComponentModal from "../modules/NewComponentModal";
import EditBar from "../modules/EditBar";
import "./Home.css";
import CollapsedGroup from "../modules/CollapsedGroup";
const SCREEN_WIDTH = 6;

//@param userId
//@param handleLogout
const Home = (props) => {
  // Initialize Default State
  const [state, setState] = useState({
    groups: [],
    bookmarks: [],
    inEditMode: false,
  });

  useEffect(() => {
    get("/api/title/bookmarks")
      .then((bookmarks) => {
        setState({ ...state, bookmarks: bookmarks });
      })
      .catch((e) => console.log("error occurred " + e));
  }, []);

  const handleCreateBookmark = ({ url, bookmarkName, icon }) => {
    //TODO @thanh_n probably should consolidate this logic into a function
    const maxIndex = Math.max(
      0,
      ...state.bookmarks.map((e) => (e.index ? e.index : 0)),
      ...state.groups.map((e) => (e.index ? e.index : 0))
    );

    const newRow = Math.floor(maxIndex / SCREEN_WIDTH) + 1;
    const newCol = (maxIndex % SCREEN_WIDTH) + 1;
    console.log("newRow" + newRow + "finalCol: " + newCol);
    const bookmark = {
      name: bookmarkName,
      url: url,
      image: icon,
      group: null,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex + 1,
    };

    console.log("sending bookmark to api");
    post("/api/title/edit/add_bookmark", bookmark).then((bookmark) => {
      console.log(bookmark.image);
      state.bookmarks.push(bookmark);
      setState({ ...state, bookmarks: state.bookmarks });
    });
  };

  const handleCreateGroup = ({ groupName }) => {
    const maxIndex = Math.max(
      0,
      ...state.bookmarks.map((e) => (e.index ? e.index : 0)),
      ...state.groups.map((e) => (e.index ? e.index : 0))
    );

    const newRow = Math.floor(maxIndex / SCREEN_WIDTH) + 1;
    const newCol = (maxIndex % SCREEN_WIDTH) + 1;
    console.log("newRow" + newRow + "finalCol: " + newCol);
    console.log("name " + groupName);
    const group = {
      name: groupName,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex + 1,
    };

    console.log("sending group to api");
    post("/api/title/edit/add_group", group).then((group) => {
      console.log("returned group after api post: " + group.bookmarks + " empty list: " + []);
      state.groups.push(group);
      setState({ ...state, groups: state.groups });
    });
  };

  return (
    <div className="Home-root">
      {!props.userId && <Redirect to={"/"} noThrow />}
      <GoogleLogout
        clientId={props.googleClientId}
        buttonText="Logout"
        onLogoutSuccess={props.handleLogout}
        onFailure={(err) => console.log(err)}
      />

      <EditBar
        handleCreateBookmark={handleCreateBookmark}
        handleCreateGroup={handleCreateGroup}
      />

      <div className="Home-grid">
        <div
          className="Home-group"
          // what are these? magic numbers?
          style={{ gridRow: `${2}/${2 + 1}`, gridColumn: `${3}/${3 + 1}` }}
        >
          {/*Hard-coded group*/}
          <Group
            bookmarks={state.bookmarks}
            inEditMode={state.inEditMode}
            userId={props.userId}
            name="Test Group"
          />
        </div>
        
        {state.groups.map((group) => {
          return (
            <div 
              key={group._id}
              style={{
                gridRow: `${group.customRow}/${group.customRow + 1}`,
                gridColumn: `${group.customCol}/${group.customCol + 1}`,
              }}
            >
              <Group
                userId={props.userId}
                inEditMode={state.inEditMode}
                name={group.name}
                bookmarks={group.bookmarks}
              />
            </div>
          );
        })}
        {state.bookmarks.map((bookmark) => {
          return (
            <div
              key={bookmark._id}
              style={{
                gridRow: `${bookmark.customRow}/${bookmark.customRow + 1}`,
                gridColumn: `${bookmark.customCol}/${bookmark.customCol + 1}`,
              }}
            >
              <Bookmark
                userId={props.userId}
                inEditMode={state.inEditMode}
                url={bookmark.url}
                name={bookmark.name}
                location={undefined}
                image={bookmark.image}
              />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
