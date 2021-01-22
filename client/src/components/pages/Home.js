import React, { useState, useEffect, createContext } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import { post, get, del, readFileAsync } from "../../utilities";
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
const IN_HOME = null;

//@param userId
//@param handleLogout
/**
 * @param handleLogout callback function on logout
 * @param googleClientId clientId used for Google Logout component
 * @param userId the google ID of the current user
 * @returns {JSX.Element} the home screen with all the shitz in it
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

  /** Loads user home page data from the database
   *  Loads bookmarks, groups
   */
  useEffect(() => {
    const bookmarksPromise = get("/api/bookmarks");
    const groupsPromise = get("/api/groups");

    Promise.all([bookmarksPromise, groupsPromise])
      .then((results) => {
        console.log(results);
        setState({
          ...state,
          bookmarks: results[0],
          groups: results[1],
        });
      })
      .catch((err) => console.log("an error occurred while fetching home page data: " + err));
  }, []);

  /** Helper function
   * Finds the maximum index within the list of bookmarks and
   * groups for the new added component
   */
  const findMaxIndex = () => {
    return Math.max(
      -1,
      ...state.bookmarks.map((e) => (e.index ? e.index : 0)),
      ...state.groups.map((e) => (e.index ? e.index : 0))
    );
  };

  /** Creates a new bookmark on the home screen given the url, bookmark name, and icon desired
   *
   * @param url the url of the new bookmark to be added
   * @param bookmarkName the name of the bookmark to be added
   * @param icon the desired icon of the new bookmark — may be undefined
   * @param customIcon the icon of the new bookmark in file form — may be undefined
   */
  const handleCreateBookmark = async ({ url, bookmarkName, icon, customIcon }) => {
    const maxIndex = findMaxIndex() + 1;
    const newRow = Math.floor(maxIndex / SCREEN_WIDTH);
    const newCol = maxIndex % SCREEN_WIDTH;
    console.log("newRow" + newRow + "finalCol: " + newCol);

    // Load the image, use empty string if custom icon is not being used
    let imageBuffer = customIcon ? await readFileAsync(customIcon) : "";
    // -----------

    const newBookmark = {
      name: bookmarkName,
      url: url,
      icon: icon,
      customIcon: imageBuffer,
      group: IN_HOME,
      customRow: newRow, //TODO REMOVE ROW AND COL 
      customCol: newCol, //TODO REMOVE ROW AND COL 
      index: maxIndex,
    };

    //Optimistic UI response, adds bookmark to home page
    setState({
      ...state,
      bookmarks: [newBookmark].concat(state.bookmarks),
    });

    //Send post request with new bookmark
    post("/api/edit/add_bookmark", newBookmark).catch((err) => {
      console.log("error occurred in post request to api on add bookmark");
    });
  };

  /** Creates a new group to display on the home screen given a user's input.
   *  The given group will be places at the next available index
   *
   * @param groupName The name that the user designate for the new group
   */
  const handleCreateGroup = ({ groupName }) => {
    const maxIndex = findMaxIndex() + 1;
    const newRow = Math.floor(maxIndex / SCREEN_WIDTH);
    const newCol = maxIndex % SCREEN_WIDTH;
    //console.log("newRow" + newRow + "finalCol: " + newCol);
    //console.log("name " + groupName);

    const newGroup = {
      name: groupName,
      customRow: newRow,
      customCol: newCol,
      index: maxIndex,
      bookmarks: [],
    };

    //Optimistic UI response, adds group to home page
    setState({
      ...state,
      groups: [newGroup].concat(state.groups),
    });

    post("/api/edit/add_group", newGroup).catch((err) => {
      console.log("error occurred in post request to api on add group");
    });
  };

  /** Optimistically removes the bookmark from the the home page
   *
   * @param _id the id of the bookmark to be removed
   */
  const handleRemoveBookmark = (_id) => {
    const newBookmarks = state.bookmarks.filter((bookmark) => bookmark._id !== _id);
    setState({ ...state, bookmarks: newBookmarks });

    del("/api/edit/delete_bookmark", { _id });
  };

  /** Handles the moving of a generic element
   * TODO add more detailed description?
   *
   * @param {*} _id
   * @param {*} index
   */
  const handleMoveElement = (_id, index) => {
    //TODO
  };

  /** Moves the group to the new location on the home page
   *
   * @param _id the id of the group to be moved
   * @param index the new target index
   */
  const handleMoveGroup = (_id, index) => {
    //Finds the target bookmark's index
    const groupListIndex = state.groups.map((group) => group._id).indexOf(_id);

    //Modifies a copy of the bookmarks list and sets it to state optimistically
    let groupsCopy = [...state.groups];
    groupsCopy[groupListIndex].index = index;
    setState({ ...state, groups: groupsCopy });

    //Sends to API
    post("/api/edit/edit_group", { _id: _id, index: index });
  };

  /** Moves the bookmark to the new location
   *
   * @param _id the id of the boookmark to be moved
   * @param index the new target index
   */
  const handleMoveBookmark = (_id, index) => {
    const filteredGroups = state.groups.filter((group) => group.index === index);
    const indexIsAGroup = filteredGroups.length === 1;

    //If the bookmark is moved to a group, special action is needed
    //Otherwise we can simply change the index of the bookmark within
    //the home page
    if (indexIsAGroup) {
      handleAddBookmarkToGroup(_id, filteredGroups[0]._id);
    } else {
      //Finds the target bookmark's index
      const bookmarkListIndex = state.bookmarks.map((bookmark) => bookmark._id).indexOf(_id);

      //Modifies a copy of the bookmarks list and sets it to state optimistically
      let bookmarksCopy = [...state.bookmarks];
      bookmarksCopy[bookmarkListIndex].index = index;
      setState({ ...state, bookmarks: bookmarksCopy });

      //Sends to API
      post("/api/edit/edit_bookmark", { _id: _id, index: index });
    }
  };

  /** Adds a bookmark to the group 
   * 
   * @param bookmarkId the ID of the bookmark that is being moved 
   * @param groupId the target group ID 
   */
  const handleAddBookmarkToGroup = (bookmarkId, groupId) => {
    const bookmarksCopy = [...state.bookmarks];
    const bookmarkListIndex = bookmarksCopy.map((bookmark) => bookmark._id).indexOf(bookmarkId);
    const targetBookmark = bookmarksCopy.splice(bookmarkListIndex, 1)[0];
  
    const groupsCopy = [...state.groups];
    const groupsListIndex = groupsCopy.map((group) => group._id).indexOf(groupId);
    const targetGroup = groupsCopy[groupsListIndex];
    
    //Replaces the bookmark's old index with new index within the group 
    const newIndex = (targetGroup.bookmarks.length === 0) ? 0 : Math.max.apply(Math, targetGroup.bookmarks.map(bookmark => Number(bookmark.index))) + 1;
    console.log(targetGroup.bookmarks.map(bookmark => bookmark.index));
    targetBookmark.index = newIndex;

    //Adds the bookmark to the group 
    groupsCopy[groupsListIndex].bookmarks.push(targetBookmark);
    //console.log("new group with bookmark: " + Object.values(groupsCopy[groupsListIndex]));
    console.log("new index of bookmark: " + newIndex);
    setState({...state, bookmarks: bookmarksCopy, groups: groupsCopy});

    //TODO: connect to persistence 
  }

  return (
    <div className="Home-root" style={{ backgroundImage: `url(${Background})` }}>
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
          <Button
            toggle={state.inEditMode}
            onClick={() => setState({ ...state, inEditMode: !state.inEditMode })}
            inverted
            size="huge"
            animated="vertical"
          >
            <div className={"icon-button"}>
              <Button.Content visible>
                <Icon name="edit" />
              </Button.Content>
            </div>
            <Button.Content hidden>Edit</Button.Content>
          </Button>
        </div>

        {/*The freaking bookmark bar*/}
        <div className={"Home-edit-dropdown"}>
          <EditBar
            handleCreateBookmark={handleCreateBookmark}
            handleCreateGroup={handleCreateGroup}
          />
        </div>
      </div>
      {/*{console.log("YOOOOOOOO")}*/}
      {/*{console.log(state.bookmarks)}*/}
      <Board
        size={48}
        userId={props.userId}
        inEditMode={state.inEditMode}
        bookmarks={state.bookmarks}
        groups={state.groups}
        handleMoveGroup={handleMoveGroup}
        handleMoveBookmark={handleMoveBookmark}
      />
    </div>
  );
};

export default Home;

export const ItemTypes = {
  BOOKMARK: "bookmark",
  GROUP: "group",
};
