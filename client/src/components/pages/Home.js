import React, { useState, useEffect, createContext } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import {post, get, del, readFileAsync} from "../../utilities";
import Bookmark from "../modules/Bookmark";
import { Button, Icon } from "semantic-ui-react";
import Group from "../modules/Group";
import EditBar from "../modules/EditBar";
import "./Home.css";
import Background from "../../public/images/background.jpg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../modules/Board";
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
      -1,
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
  const handleCreateBookmark = async ({ url, bookmarkName, icon, customIcon })  => {
    const maxIndex = findMaxIndex() +1;
    const newRow = Math.floor(maxIndex / (SCREEN_WIDTH));
    const newCol = maxIndex % (SCREEN_WIDTH);
    console.log("newRow" + newRow + "finalCol: " + newCol);
    // Load the image --------
    let imageBuffer = customIcon ? await readFileAsync(customIcon): "";
    // console.log("imageBuffer: ", imageBuffer);
    // -----------
    const bookmark = {
      name: bookmarkName,
      url: url,
      icon: icon,
      // customIcon: new TextDecoder().decode(imageBuffer),  // converts ArrayBuffer to string
      customIcon: imageBuffer,
      group: null,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex,
    };

    const tempDisplayedBookmark = {...bookmark, customIcon: imageBuffer};

    // console.log("sending bookmark to api with customIcon " + imageBuffer);
    post("/api/edit/add_bookmark", bookmark).then((bookmark) => {
      state.bookmarks.push(tempDisplayedBookmark);
      setState({ ...state, bookmarks: state.bookmarks });
    });
  };

  //TODO: Live update?
  /** Creates a new group to display on the home screen given a user's input.
   *  The given group will be places at the next available index
   *
   * @param groupName The name that the user designate for the new group
   *
   *
   */
  const handleCreateGroup = ({ groupName }) => {
    const maxIndex = findMaxIndex() +1;
    const newRow = Math.floor(maxIndex / (SCREEN_WIDTH));
    const newCol = maxIndex % (SCREEN_WIDTH);
    console.log("newRow" + newRow + "finalCol: " + newCol);
    console.log("name " + groupName);
    const group = {
      name: groupName,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex,
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
  const handleMoveElement = (_id, index) => {

  }
  //TODO: better handled with _id?
  const handleMoveGroup = (_id,index) => {
    const group = state.groups.filter((group) => group._id === _id);

    group[0].index = index;
    const newGroupList = state.groups.filter((group) => group._id !== _id).concat(group[0]);
    // console.log(newGroupList);
    // console.log(group)
    post("/api/edit/edit_group",  {_id: _id,index: index});
    setState({...state, groups: newGroupList});

  }


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
      </div>


        {/*{console.log("YOOOOOOOO")}*/}
        {/*{console.log(state.bookmarks)}*/}
        <Board
               userId={props.userId}
               inEditMode = {state.inEditMode}
               bookmarks={state.bookmarks}
               groups={state.groups}
               handleMoveGroup = {handleMoveGroup}
                />

    </div>
  );
};

export default Home;

export const ItemTypes = {
  BOOKMARK : "bookmark",
  GROUP: "group"
}
