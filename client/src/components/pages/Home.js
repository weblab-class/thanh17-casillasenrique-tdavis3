import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import { del, get, post } from "../../utilities";
import Bookmark from "../modules/Bookmark";
import { Button, Icon } from "semantic-ui-react";
import Group from "../modules/Group";
import EditBar from "../modules/EditBar";
import "./Home.css";
import Background from "../../public/images/background.jpg";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SCREEN_WIDTH = 8;

//@param userId
//@param handleLogout
/**
 * @param props I don't actually know lmao
 * @returns {JSX.Element} the home screen with all the shitz in it
 * @constructor wtf would this be?
 */
const Home = (props) => {
  // Initialize Default State
  /**
   *  @state groups: the list of groups that the user has created
   *  @state bookmarks: the list of bookmarks that the user has created
   *  @state inEditMode: a boolean value indicating whether the homepage is in
   *      edit mode
   *
   */
  const [state, setState] = useState({
    groups: [],
    bookmarks: [],
    inEditMode: false,
  });

  useEffect(() => {
    get("/api/bookmarks")
      .then((bookmarks) => {
        get("/api/groups")
          .then((groups) => {
            setState({ ...state, groups: groups, bookmarks: bookmarks });
          })
          .catch((e) => console.log("error occurred when fetching groups: " + e));
      })
      .catch((e) => console.log("error occurred when fetching bookmarks: " + e));
  }, []);

  const findMaxIndex = () => {
    return Math.max(
      0,
      ...state.bookmarks.map((e) => (e.index ? e.index : 0)),
      ...state.groups.map((e) => (e.index ? e.index : 0))
    );
  }


  /** Creates a new bookmark on the home screen given the url, bookmark name, and icon desired
   *
   * @param url the url of the new bookmark to be added
   * @param bookmarkName the name of the bookmark to be added
   * @param icon the desired icon of the new bookmark
   */
  const handleCreateBookmark = ({ url, bookmarkName, icon, customIcon }) => {
    const maxIndex = findMaxIndex();
    const newRow = Math.floor(maxIndex / SCREEN_WIDTH) + 1;
    const newCol = (maxIndex % SCREEN_WIDTH) + 1;
    console.log("newRow" + newRow + "finalCol: " + newCol);
    console.log("custom icon: " + customIcon);
    const bookmark = {
      name: bookmarkName,
      url: url,
      icon: icon,
      customIcon: customIcon,
      group: null,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex + 1,
    };

    console.log("sending bookmark to api with customIcon " + customIcon);
    post("/api/edit/add_bookmark", bookmark).then((bookmark) => {
      state.bookmarks.push(bookmark);
      setState({ ...state, bookmarks: state.bookmarks });
    });
  };

  /** Creates a new group to display on the home screen given a user's input.
   *  The given group will be places at the next available index
   *
   * @param groupName The name that the user designate for the new group
   *
   *
   */
  const handleCreateGroup = ({ groupName }) => {
    const maxIndex = findMaxIndex();
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
    post("/api/edit/add_group", group).then((group) => {
      console.log("returned group after api post: " + group.bookmarks + " empty list: " + []);
      state.groups.push(group);
      setState({ ...state, groups: state.groups });
    });
  };

  const handleRemoveBookmark = (_id) => {
    const newBookmarks = state.bookmarks.filter(bookmark => bookmark._id !== _id);
    setState({...state, bookmarks: newBookmarks});
    
    del("/api/edit/delete_bookmark", {_id})
  }

  // const moveBookmark = (_id,x,y) => {
  //   const bookmark = this.state.bookmarks.filter((bookmark) => bookmark._id === _id);
  //   //TODO: change the bookmark's location to the new one
  //
  //   //bookmark[row_index].row = new row
  //   // handleRemoveBookmark(_id)
  //
  // }


  return (
    <div className="Home-root" style={{backgroundImage: `url(${Background})`}}>
      {!props.userId && <Redirect to={"/"} noThrow />}

      {/*The logout button*/}
      <div className={"Home-top"}>
        <GoogleLogout
          clientId={props.googleClientId}
          buttonText="Logout"
          onLogoutSuccess={props.handleLogout}
          onFailure={(err) => console.log(err)}
        />
      </div>

      <div className="Home-toggleEdit">
          <Button toggle={state.inEditMode} onClick={() => setState({...state, inEditMode: !state.inEditMode})}  inverted size="huge" animated="vertical">
            <div className={"icon-button"}>
            <Button.Content visible >

                <Icon  name="edit"/>

              </Button.Content>
            </div>
            <Button.Content hidden>Edit</Button.Content>
          </Button>
      </div>

      {/*The freaking bookmark bar*/}
      <div className={"Home-edit-dropdown"}>
        <EditBar
          handleCreateBookmark={handleCreateBookmark}
          handleCreateGroup={handleCreateGroup}/>
      </div>
      <DndProvider backend = {HTML5Backend}>
        {/*{console.log("YOOOOOOOO")}*/}
        {/*{console.log(state.bookmarks)}*/}
        {/*<Board bookmarks={state.bookmarks} groups={state.groups}/>*/}
      <div className="Home-grid">
        <div
          className="Home-group"
          // what are these? mag ic numbers?
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

        {/*Render all of the damn groups*/}
        {state.groups.map((group) => {
          return (
            //TODO: pass in row and column and index into group
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

        {/*Render all of the damn bookmarks*/}
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
                icon={bookmark.icon}
                customIcon={bookmark.customIcon}
                customRow = {bookmark.customRow}
                customCol={bookmark.customCol}
                index={bookmark.index}
                onRemove={() => handleRemoveBookmark(bookmark._id)}
              />{" "}
            </div>
          );
        })}
      </div>
      </DndProvider>
    </div>
  );
};

export default Home;

export const ItemTypes = {
  BOOKMARK : "bookmark",
  GROUP: "group"
}
