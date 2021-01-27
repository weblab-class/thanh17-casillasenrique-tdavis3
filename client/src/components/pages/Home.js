import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "@reach/router";
import { del, get, post, readFileAsync } from "../../utilities";
import { Button, Icon, Sidebar, Placeholder, Modal } from "semantic-ui-react";
import "./Home.css";
import Board from "../modules/Board";
import NewComponentModal from "../modules/NewComponentModal";
import FirstLoginDialogue from "../modules/FirstLoginDialogue";
import SettingsForm from "../modules/SettingsForm";
import background from "../../public/images/background.jpg";
import globe_light from "../../public/images/globe_light.png";
import HomeSidebar from "../modules/HomeSidebar";
const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";

const ELEMENTS_PER_PAGE = 48;
const ELEMENTS_PER_GROUP = 9;
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
    currentPage: 0,
    groups: [],
    bookmarks: [],
    inEditMode: false,
    sidebarVisible: false,
    isDarkMode: false,
    backgroundImage: undefined,
    isFirstLogin: false,
  });

  /** Loads user home page data from the database
   *  Loads bookmarks, groups
   */
  useEffect(() => {
    const bookmarksPromise = get("/api/bookmarks");
    const groupsPromise = get("/api/groups");
    const settingsPromise = get("/api/settings");

    Promise.all([bookmarksPromise, groupsPromise, settingsPromise])
      .then((results) => {
        let bookmarks = results[0];
        let groups = results[1];
        let settings = results[2];

        //console.log("from component did mount: \nbookmarks: " + bookmarks + "\ngroups: " + groups + "\nsettings: " + settings.isDarkMode + "," + settings.backgroundImage);
        console.log("from database, retrieved that dark mode is " + settings.isDarkMode);
        setState({
          ...state,
          bookmarks: bookmarks,
          groups: groups,
          isDarkMode: settings.isDarkMode,
          backgroundImage: settings.backgroundImage,
          isFirstLogin: settings.firstLogin,
        });
      })
      .catch((err) => console.log("an error occurred while fetching home page data: " + err));
  }, []);

  /** Helper function
   * Finds the maximum index within the list of bookmarks and
   * groups for the new added component
   */
  const findMaxIndex = (currentPage, groupID) => {
    if (groupID) {
      // console.log("ID,bitch", groupID);
      const group = state.groups.filter((group) => group._id === groupID)[0];
      // console.log("GROUP,BITCH", group);
      return Math.max(
        -1,
        ...group.bookmarks
          .filter((bookmark) => bookmark.pageIndex === currentPage)
          .map((e) => (e.index ? e.index : 0))
      );
    }
    return Math.max(
      -1,
      ...state.bookmarks
        .filter((bookmark) => bookmark.pageIndex === currentPage)
        .map((e) => (e.index ? e.index : 0)),
      ...state.groups
        .filter((group) => group.pageIndex === currentPage)
        .map((e) => (e.index ? e.index : 0))
    );
  };

  /** Find the next page and index in the sequence of pages
   *
   * @param currentPage
   * @param groupID
   * @returns {[number, undefined]}
   */
  const findNextPageAndIndex = (currentPage, groupID) => {
    let page = currentPage;
    let maxIndex = findMaxIndex(page, groupID) + 1;
    const maxGrids = groupID ? ELEMENTS_PER_GROUP : ELEMENTS_PER_PAGE;
    while (maxIndex >= maxGrids) {
      page += 1;
      console.log("need to go to the next page");
      maxIndex = findMaxIndex(page, groupID) + 1;
    }

    return [maxIndex, page];
  };

  /** Return the first empty index at currentPage
   *
   * @param currentPage the page we are looking for the index in
   * @param groupID the ID of the group if it exists
   * @returns {number} the first empty index at currentPage
   */
  const findEmptyIndex = (currentPage, groupID) => {
    const findElementAtIndex = () => {
      // console.log(group)
      return groupID
        ? group.bookmarks.filter(
            (bookmark) => bookmark.index === emptyIndex && bookmark.pageIndex === currentPage
          )
        : [
            ...state.bookmarks.filter(
              (bookmark) => bookmark.index === emptyIndex && bookmark.pageIndex === currentPage
            ),
            ...state.groups.filter(
              (group) => group.index === emptyIndex && group.pageIndex === currentPage
            ),
          ];
    };
    let emptyIndex = 0;
    const maxGrids = groupID ? ELEMENTS_PER_GROUP : ELEMENTS_PER_PAGE;
    const group = groupID ? state.groups.filter((group) => group._id === groupID)[0] : null;
    // console.log(group)
    // console.log("emptyIndex outside:", emptyIndex)
    let elementAtIndex = findElementAtIndex();
    // console.log("elementAtIndex",elementAtIndex);
    while (elementAtIndex.length !== 0 && emptyIndex <= maxGrids) {
      // console.log("emptyIndex", emptyIndex)
      emptyIndex += 1;
      elementAtIndex = findElementAtIndex();
      // console.log("elementAtIndex Inside:",elementAtIndex);
    }

    return emptyIndex;
  };
  /** Return the first available page and index given the current page number and
   * groupID if in a group
   *
   * @param currentPage the page that we wish to move to
   * @param groupID
   * @returns {[number, undefined]}
   */
  const findFirstAvailablePageAndIndex = (currentPage, groupID) => {
    let page = currentPage;
    // let maxIndex = findMaxIndex(page, groupID) + 1;
    const maxGrids = groupID ? ELEMENTS_PER_GROUP : ELEMENTS_PER_PAGE;
    let emptyIndex = findEmptyIndex(page, groupID);
    while (emptyIndex >= maxGrids) {
      //check each index until empty grid.
      page += 1;
      console.log("need to go to the next page");
      // maxIndex = findMaxIndex(page, groupID) + 1;
      emptyIndex = findEmptyIndex(page, groupID);
    }

    return [emptyIndex, page];
  };

  /** Creates a new bookmark on the home screen given the url, bookmark name, and icon desired
   *
   * @param url the url of the new bookmark to be added
   * @param bookmarkName the name of the bookmark to be added
   * @param selectedIcon the desired icon of the new bookmark — may be null
   * @param selectedCustomIcon the icon of the new bookmark in file form — may be null
   */
  const handleCreateBookmark = async ({ url, bookmarkName, selectedIcon, selectedCustomIcon }) => {
    const [maxIndex, page] = findFirstAvailablePageAndIndex(state.currentPage);

    // Load the image, use empty string if custom icon is not being used
    let imageBuffer = selectedCustomIcon ? await readFileAsync(selectedCustomIcon) : "";
    // -----------

    const newBookmark = {
      name: bookmarkName,
      url: url,
      icon: selectedIcon,
      customIcon: imageBuffer,
      index: maxIndex,
      pageIndex: page,
    };

    //Send post request with new bookmark
    post("/api/edit/add_bookmark", newBookmark)
      .then((result) => {
        //Sets the custom icon to be the image buffer as the result holds the
        //binary form.
        result.customIcon = imageBuffer;

        setState({
          ...state,
          currentPage: page,
          bookmarks: [result].concat(state.bookmarks),
        });
      })
      .catch((err) => {
        console.log("error occurred in post request to api on add bookmark: " + err);
      });
  };

  /** Creates a new group to display on the home screen given a user's input.
   *  The given group will be places at the next available index
   *
   * @param groupName The name that the user designate for the new group
   */
  const handleCreateGroup = ({ groupName }) => {
    const [maxIndex, page] = findFirstAvailablePageAndIndex(state.currentPage);

    const newGroup = {
      name: groupName,
      index: maxIndex,
      bookmarks: [],
      pageIndex: page,
    };

    post("/api/edit/add_group", newGroup)
      .then((result) => {
        setState({
          ...state,
          groups: [result].concat(state.groups),
          currentPage: page,
        });
      })
      .catch((err) => {
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

  /** Remove a Group from the home screen
   *
   * @param _id
   */
  const handleRemoveGroup = (_id) => {
    const newGroups = state.groups.filter((group) => group._id !== _id);
    setState({ ...state, groups: newGroups });

    del("/api/edit/delete_group", { _id });
  };

  /** remove a Bookmark from a group
   *
   * @param groupID the Group id number
   * @param _id the id of the Bookmark
   */
  const removeBookmarkFromGroup = (groupID, _id) => {
    const group = state.groups.filter((group) => group._id === groupID)[0];
    console.log(group);
    group.bookmarks = group.bookmarks.filter((bookmark) => bookmark._id !== _id);

    const newGroups = state.groups.filter((group) => group._id !== groupID);
    newGroups.push(group);

    setState({ ...state, groups: newGroups });
    console.log(state.groups);

    post("/api/edit/edit_group", group);
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
    post("/api/edit/edit_group", groupsCopy[groupListIndex]);
  };

  /** Moves the bookmark to the new location
   *
   * @param _id the id of the boookmark to be moved
   * @param index the new target index
   */
  const handleMoveBookmark = (_id, index) => {
    const filteredGroups = state.groups.filter(
      (group) => group.index === index && group.pageIndex === state.currentPage
    );
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
      post("/api/edit/edit_bookmark", { _id: _id, index: index, pageIndex: state.currentPage });
    }
  };
  /** Handling the moving of bookmarks between pages in a group or a home screen
   *
   * @param _id id of the bookmark
   * @param newPageIndex the index of the new page
   * @param groupID the ID number of the group the bookmark is in if it exists
   */
  const handleMoveBookmarkToNewPage = (_id, newPageIndex, groupID) => {
    let group;
    let newIndex;
    let newPage;
    let allBookmarks;
    if (groupID) {
      group = state.groups.filter((group) => group._id === groupID)[0];
      allBookmarks = group.bookmarks;
    } else {
      allBookmarks = state.bookmarks;
    }
    [newIndex, newPage] = findFirstAvailablePageAndIndex(newPageIndex, groupID);
    const bookmarkListIndex = allBookmarks.map((bookmark) => bookmark._id).indexOf(_id);
    // console.log("newPageNumber", newPage)
    // console.log("newIndex:",newIndex)
    // console.log("allBookmarks",allBookmarks)

    //Create new bookmarks in new page
    let bookmarksCopy = [...allBookmarks];
    // console.log(bookmarksCopy);
    bookmarksCopy[bookmarkListIndex].index = newIndex;
    bookmarksCopy[bookmarkListIndex].pageIndex = newPage;

    //Different API calls dependant on bookmarks in groups or on homepage
    if (groupID) {
      group.bookmarks = bookmarksCopy;
      const newGroups = state.groups.filter((group) => group._id !== groupID);
      newGroups.push(group);
      setState({ ...state, groups: newGroups });
      post("/api/edit/edit_group", group);
    } else {
      //Sends to API
      setState({ ...state, bookmarks: bookmarksCopy });
      post("/api/edit/edit_bookmark", { _id: _id, index: newIndex, pageIndex: newPage });
    }
  };

  const handleMoveGroupToNewPage = (_id, newPageIndex) => {
    const [newIndex, newPage] = findFirstAvailablePageAndIndex(newPageIndex);
    const groupListIndex = state.groups.map((group) => group._id).indexOf(_id);

    //Modifies a copy of the bookmarks list and sets it to state optimistically
    let groupsCopy = [...state.groups];
    groupsCopy[groupListIndex].index = newIndex;
    groupsCopy[groupListIndex].pageIndex = newPage;
    setState({ ...state, groups: groupsCopy });

    //Sends to API
    post("/api/edit/edit_group", groupsCopy[groupListIndex]);
  };
  /** Move a bookmark in a group
   *
   * @param groupID ID of the group we're modifying
   * @param _id the id of the bookmark being moved
   * @param index the new index of the bookmark
   */
  const moveBookmarksInGroup = (groupID, _id, index) => {
    const group = state.groups.filter((group) => group._id === groupID)[0];
    //Find the index of bookmark, set to new index
    const bookmarkListIndex = group.bookmarks.map((bookmark) => bookmark._id).indexOf(_id);
    let bookmarksCopy = [...group.bookmarks];
    bookmarksCopy[bookmarkListIndex].index = index;
    group.bookmarks = bookmarksCopy;

    const newGroups = state.groups.filter((group) => group._id !== groupID);
    newGroups.push(group);

    setState({ ...state, groups: newGroups });

    post("/api/edit/edit_group", group);
  };

  const handleMoveBookmarkOut = (groupID, _id) => {
    const group = state.groups.filter((group) => group._id === groupID)[0];
    const bookmark = group.bookmarks.filter((bookmark) => bookmark._id === _id)[0];
    removeBookmarkFromGroup(groupID, _id);
    const [newIndex, newPage] = findFirstAvailablePageAndIndex(state.currentPage);
    const newBookmark = {
      name: bookmark.name,
      url: bookmark.url,
      icon: bookmark.icon,
      customIcon: bookmark.customIcon,
      index: newIndex,
      pageIndex: newPage,
    };

    //Send post request with new bookmark
    post("/api/edit/add_bookmark", newBookmark)
      .then((result) => {
        //Sets the custom icon to be the image buffer as the result holds the
        //binary form.
        result.customIcon = bookmark.customIcon;
        setState({
          ...state,
          bookmarks: [result].concat(state.bookmarks),
        });
      })
      .catch((err) => {
        console.log("error occurred in post request to api on add bookmark: " + err);
      });
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

    //Replaces the bookmark's old index with new index within the group
    //const targetGroup = groupsCopy[groupsListIndex];
    const [newIndex, newPage] = findFirstAvailablePageAndIndex(0, groupId);
    
    // console.log(targetGroup.bookmarks.map((bookmark) => bookmark.index));

    targetBookmark.index = newIndex;
    targetBookmark.pageIndex = newPage;
    console.log(
      "new index: " + (newIndex) + " New page: " + targetBookmark.pageIndex
    );

    //Adds the bookmark to the group
    groupsCopy[groupsListIndex].bookmarks = [targetBookmark].concat(
      groupsCopy[groupsListIndex].bookmarks
    );
    //console.log("new group with bookmark: " + Object.values(groupsCopy[groupsListIndex]));
    //console.log("new index of bookmark: " + newIndex);
    //Optimistic
    setState({ ...state, bookmarks: bookmarksCopy, groups: groupsCopy });

    //TODO: connect to persistence
    const editGroupPromise = post("/api/edit/edit_group", groupsCopy[groupsListIndex]);
    const deleteBookmarkPromise = del("/api/edit/delete_bookmark", { _id: bookmarkId });

    Promise.all([editGroupPromise, deleteBookmarkPromise])
      .then((results) => {
        setState({ ...state, bookmarks: bookmarksCopy, groups: groupsCopy });
      })
      .catch((err) => console.log("error occurred while sending changes: " + err));
  };

  /** Helper function that takes group objects and
   * creates them on the front end. Additionally saves
   * them to the database
   *
   * @param {List} groups
   */
  const uploadToHome = (groups, isDarkMode, background, startingPage) => {
    setState({ ...state, backgroundImage: null });

    post("/api/edit/add_multiple_groups", { groups }).then((result) => {
      //console.log("addings groups to state");
      //console.log("groups result: ", result);
      result = result.map((group) => {
        return {
          ...group,
          bookmarks: group.bookmarks.map((bookmark) => {
            return { ...bookmark, customIcon: "" };
          }),
        };
      });

      setState({
        ...state,
        groups: result.concat(state.groups),
        backgroundImage: background,
        isDarkMode: isDarkMode,
        isFirstLogin: false,
        currentPage: startingPage,
      });
    });
  };

  /** Helper function that creates bookmark and group objects from the
   * parsed bookmarks. Returns groups in the form of a map
   * mapping group names to group objects with additional
   * fields.
   *
   * @param {List} bookmarks
   */
  const createComponentsFromNodes = (bookmarks) => {
    let [index, startingPage] = findNextPageAndIndex(state.currentPage, null);
    let page = startingPage;
    console.log("index and page: ", index, page);
    let newGroups = new Map();

    for (const { parentName, icon, name, href, html } of bookmarks) {
      //Group needs to be created
      if (!newGroups.has(parentName)) {
        let newBookmark = {
          name: name,
          url: href,
          icon: icon,
          customIcon: "",
          index: 0,
          pageIndex: 0,
        };

        newGroups.set(parentName, {
          maxGroupIndex: 0,
          maxGroupPage: 0,
          group: {
            name: parentName,
            index: index,
            pageIndex: page,
            bookmarks: [newBookmark],
          },
        });

        //Updates page and index for the next group
        page = index === ELEMENTS_PER_PAGE - 1 ? page + 1 : page;
        index = (index + 1) % ELEMENTS_PER_PAGE;

        //Group needs to be updated
      } else {
        let groupData = newGroups.get(parentName);
        let newBookmarkIndex = (groupData.maxGroupIndex + 1) % ELEMENTS_PER_GROUP;
        let newBookmarkPageIndex =
          groupData.maxGroupIndex === ELEMENTS_PER_GROUP - 1
            ? groupData.maxGroupPage + 1
            : groupData.maxGroupPage;

        let newBookmark = {
          name: name,
          url: href,
          icon: icon,
          customIcon: "",
          index: newBookmarkIndex,
          pageIndex: newBookmarkPageIndex,
        };

        newGroups.set(parentName, {
          maxGroupIndex: newBookmarkIndex,
          maxGroupPage: newBookmarkPageIndex,
          group: { ...groupData.group, bookmarks: [newBookmark].concat(groupData.group.bookmarks) },
        });
      }
    }

    //console.log(newGroups);

    return [newGroups, startingPage];
  };

  /** Helper function of handleUploadBookmarks
   * Parses a chrome HTML file and uploads the bookmarks
   * to the home page in groups. Throws error if unable to parse
   *
   * @param {File} htmlFile
   */
  const parseAndUpload = (htmlFile, isDarkMode, background) => {
    let reader = new FileReader();

    /** Function called on reader load,
     * creates DOM Parse Tree and filters the nodes
     * in order to find all bookmarks and the parent
     * components
     *
     * @param {Text} loadedFile
     */
    reader.onload = (loadedFile) => {
      let contents = loadedFile.target.result;
      const domParser = new DOMParser();
      const document = domParser.parseFromString(contents, "text/html");

      //console.log(document);

      //Finds all links within the document body
      const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          return node.nodeName.toLowerCase() === "a"
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      });

      //Iterates through link nodes
      const linkNodes = [];
      let currentNode;
      while ((currentNode = nodeIterator.nextNode())) {
        linkNodes.push(currentNode);
      }

      //console.log(linkNodes);

      //Extracts the relevant information from the link nodes,
      //including the parent text, icon, bookmark name, and url
      const parentNameIndex = 0;
      const regexMatchIndex = 2;
      let newNodes = linkNodes.map((node) => {
        let icon = node.outerHTML.match(new RegExp('(icon="([^"]*)")'));
        //console.log(node.outerText + " icon: " + icon);
        if (!icon) {
          console.log("element did not have an icon");
          icon = globe_light;
        } else {
          //icon = icon[regexMatchIndex];
          icon = FAVICON_URL + node.href;
        }

        return {
          parentName: node.parentNode.parentNode.parentNode.children.item(parentNameIndex)
            .outerText,
          icon: icon,
          name: node.outerText,
          href: node.href,
          html: node.outerHTML,
        };
      });

      //console.log(newNodes);

      //Creates groups and uploads to the home page
      let [groups, startingPage] = createComponentsFromNodes(newNodes);
      groups = Array.from(groups.values()).map((groupData) => groupData.group);
      console.log(groups);
      uploadToHome(groups, isDarkMode, background, startingPage);
    };

    reader.readAsText(htmlFile);
  };

  /** Uploads bookmarks from a chrome HTML file onto the home page
   * Since folders are not implemented, creates a shallow clone of the folders
   * by taking each bookmark and checking its parent folder, that becomes its
   * parent group.
   * TODO: possibly move function to be handled in the server
   * Catches error if file cannot be parsed
   *
   * @param {File} htmlFile
   */
  const handleUploadBookmarksAndSettings = (htmlFile, isDarkMode, background) => {
    try {
      parseAndUpload(htmlFile, isDarkMode, background);
    } catch (e) {
      console.log("Failed to parse given chrome bookmarks file. Please try a different file");
    }
  };

  /** Returns whether there is a bookmark at the given index index
   *
   * @param index the index to check whether there is a bookmark
   */
  const indexHasNoBookmarks = (index) => {
    const filteredBookmarks = state.bookmarks.filter(
      (bookmark) => bookmark.index === index && bookmark.pageIndex === state.currentPage
    );
    //console.log("index " + index + "has no elements: " + (filteredBookmarks.length === 0));
    // console.log(filteredBookmarks.length)
    return filteredBookmarks.length === 0;
  };
  /** Returns whether there is any element at the given index index
   *
   * @param index
   */
  const indexHasNoElements = (index) => {
    const filteredGroups = state.groups.filter(
      (group) => group.index === index && group.pageIndex === state.currentPage
    );
    return indexHasNoBookmarks(index) && filteredGroups.length === 0;
  };

  const handleEditSettings = async (imageFileObject, bookmarksFile, isDarkMode) => {
    console.log(isDarkMode);
    let savedFile = state.backgroundImage;
    if (imageFileObject) {
      savedFile = await readFileAsync(imageFileObject);
    }

    if (bookmarksFile) {
      console.log("had to also handle bookmarks");
      handleUploadBookmarksAndSettings(bookmarksFile, isDarkMode, savedFile);
    } else {
      console.log("only had to handle bookmarks file and isDarkMode");
      setState({
        ...state,
        backgroundImage: savedFile,
        isDarkMode: isDarkMode,
        isFirstLogin: false,
      });
    }

    post("/api/edit/settings", { backgroundImage: savedFile, isDarkMode: isDarkMode })
      .then((result) => {
        //console.log("result from editing settings: " + Object.keys(result) + " \nv: " + Object.values(result));
      })
      .catch((e) => console.log("error occurred: " + e));
  };

  return (
    <>
      <FirstLoginDialogue
        open={state.isFirstLogin}
        handleSubmitDialogue={handleEditSettings}
        closeForm={() => console.log("closing form")}
        isDarkMode={state.isDarkMode}
      />
      {!props.userId && <Redirect to={"/"} noThrow />}
      {!state.backgroundImage ? (
        <Placeholder as="h1" style={{ color: "grey" }} inverted fluid>
          <Placeholder.Image style={{ height: "100vh", backgroundSize: "cover" }} />
          <div
            style={{
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "50%",
            }}
          >
            Loading...
          </div>
        </Placeholder>
      ) : (
        <Sidebar.Pushable style={{ fontFamily: "'Quicksand', sans-serif !important" }}>
          <HomeSidebar
            visible={state.sidebarVisible}
            onHide={() => setState({ ...state, sidebarVisible: false })}
            handleCreateBookmark={handleCreateBookmark}
            handleCreateGroup={handleCreateGroup}
            handleLogout={props.handleLogout}
            googleClientId={props.googleClientId}
            userName={props.userName}
            handleEditSettings={handleEditSettings}
            isDarkMode={state.isDarkMode}
          />

          <Sidebar.Pusher dimmed={state.sidebarVisible}>
            <div
              className="Home-root"
              style={{ backgroundImage: state.backgroundImage && `url(${state.backgroundImage})` }}
            >
              {/*The logout button*/}
              <div className={"Home-top"}>
                {/*<GoogleLogout*/}
                {/*  clientId={props.googleClientId}*/}
                {/*  buttonText="Logout"*/}
                {/*  onLogoutSuccess={props.handleLogout}*/}
                {/*  onFailure={(err) => console.log(err)}*/}
                {/*/>*/}
                <div
                  style={{
                    display: "flex",
                    paddingTop: "1em",
                    paddingLeft: "1em",
                    paddingRight: "1em",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Button
                      disabled={state.currentPage === 0}
                      inverted={state.isDarkMode}
                      // content='Previous'
                      icon="angle left"
                      // labelPosition='left'
                      size={"medium"}
                      onClick={() => setState({ ...state, currentPage: state.currentPage - 1 })}
                    />
                    <Button
                      inverted={state.isDarkMode}
                      // content='Next'
                      size={"medium"}
                      icon="angle right"
                      // labelPosition='right'
                      onClick={() => setState({ ...state, currentPage: state.currentPage + 1 })}
                    />
                  </div>

                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "larger",
                      color: state.isDarkMode ? "whitesmoke" : "darkgray",
                      position: "fixed",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    Page {state.currentPage + 1}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="Home-toggleEdit">
                      <Button
                        toggle={state.inEditMode}
                        onClick={() => setState({ ...state, inEditMode: !state.inEditMode })}
                        inverted={state.isDarkMode}
                        size="medium"
                        animated="fade"
                        primary={state.inEditMode}
                      >
                        <div className={"icon-button"}>
                          <Button.Content visible>
                            <Icon name="move" />
                          </Button.Content>
                        </div>
                        <Button.Content hidden>Edit</Button.Content>
                      </Button>
                    </div>

                    {/*The freaking bookmark bar*/}
                    <div className={"Home-edit-dropdown"}>
                      <Button
                        inverted={state.isDarkMode}
                        animated
                        size="medium"
                        onClick={() =>
                          setState({ ...state, sidebarVisible: !state.sidebarVisible })
                        }
                      >
                        <div className="icon-button">
                          <Button.Content visible>
                            <Icon name="bars" />
                          </Button.Content>
                        </div>
                        <Button.Content hidden>Options</Button.Content>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/*<Button content="add test bookmark" onClick={() => handleCreateBookmark({url: "https://google.com", bookmarkName: "Test Bookmark", selectedIcon: "https://www.google.com/s2/favicons?sz=256&domain_url=https://www.google.com", selectedCustomIcon: null})}/>*/}

              {/*{console.log("YOOOOOOOO")}*/}
              {/*{console.log(state.bookmarks)}*/}
              <Board
                size={ELEMENTS_PER_PAGE}
                userId={props.userId}
                inEditMode={state.inEditMode}
                bookmarks={state.bookmarks.filter(
                  (bookmark) => bookmark.pageIndex === state.currentPage
                )}
                groups={state.groups.filter((group) => group.pageIndex === state.currentPage)}
                handleMoveGroup={handleMoveGroup}
                handleMoveBookmark={handleMoveBookmark}
                handleMoveBookmarkToNewPage={handleMoveBookmarkToNewPage}
                handleMoveGroupToNewPage={handleMoveGroupToNewPage}
                handleMoveBookmarkOut={handleMoveBookmarkOut}
                moveBookmarksInGroup={moveBookmarksInGroup}
                handleRemoveBookmark={handleRemoveBookmark}
                handleRemoveGroup={handleRemoveGroup}
                removeBookmarkFromGroup={removeBookmarkFromGroup}
                indexHasNoBookmarks={indexHasNoBookmarks}
                indexHasNoElements={indexHasNoElements}
                isDarkMode={state.isDarkMode}
              />
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      )}
    </>
  );
};

export default Home;

export const ItemTypes = {
  BOOKMARK: "bookmark",
  GROUP: "group",
};
