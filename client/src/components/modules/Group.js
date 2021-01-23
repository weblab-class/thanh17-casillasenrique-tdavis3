//TODO: install semantic UI
//

import React, { Component, useEffect, useState } from "react";
import "./Group.css";
import { Button, Header, Image, Modal, Icon, Grid } from "semantic-ui-react";
import Bookmark from "./Bookmark";
import CollapsedGroup from "./CollapsedGroup";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../pages/Home";
import Board from "./Board";
import { del, post } from "../../utilities";

/** Creates a group object given all of the properties of the group and its identification
 *
 * @param _id ID of group
 * @param bookmarks the list of bookmarks for the given group
 * @param inEditMode boolean indicating whether the specific group is in edit mode or not
 * @param userId the Google ID that correspond to the group owner
 * @param name name of the group
 * @param index index location of the group element
 * @returns {JSX.Element}
 * @constructor
 */
const Group = ({
                 _id,
                 bookmarks,
                 inEditMode,
                 userId,
                 name,
                 index,
                 indexHasNoBookmarks}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
  },[bookmarks]);

  const [page, setPage] = useState(0);

  //TODO: handleRemoveBookmark
  const handleRemoveBookmark = (_id) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark._id !== _id);

    // setState({ ...state, bookmarks: newBookmarks });
    //TODO: populate??

    // del("/api/edit/delete_bookmark", { _id });
  };

  //TODO: handleMoveBookmark edit bookmarks and update group?
  const handleMoveBookmark = (_id,index) => {
    const bookmarkListIndex = bookmarks.map((bookmark) => bookmark._id).indexOf(_id);

    //Modifies a copy of the bookmarks list and sets it to state optimistically
    let bookmarksCopy = [...bookmarks];
    bookmarksCopy[bookmarkListIndex].index = index;
    // bookmarks = bookmarksCopy;
    // setState({ ...state, bookmarks: bookmarksCopy });
    // post("/api/edit/edit_bookmark", { _id: _id, index: index });
  }
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.GROUP,
      _id: _id,
      // customRow: 0,
      // inEditMode: inEditMode,
      // customCol: 0,
      index: index
    },
    // canDrag: inEditMode,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  // const [{ isOver }, drop] = useDrop({
  //   accept: ItemTypes.BOOKMARK,
  //   drop: (item) =>
  //       // handleAddBookmark(item._id,index),
  //   console.log(item),
  //   collect: monitor => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // })

  return (
    <Modal
      className="Group modal"
      size="small"
      onClose={() => { 
        setOpen(false);
        setPage(0); 
      }}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={
        <div
      //     ref={drag}
      //   style={{
      //   opacity: isDragging ? 0 : 1,
      //   fontSize: 25,
      //   fontWeight: 'bold',
      //   cursor: 'move',
      // }}
        >
        <CollapsedGroup
          drag = {drag}
          isDragging ={isDragging}
          name={name}
          bookmarkIcons={bookmarks.filter(bookmark => bookmark.pageIndex === 0).map(bookmark => bookmark.customIcon ? bookmark.customIcon : bookmark.icon)}
          onClick={() => setOpen(true)}
        />
        </div>
      }
      centered
    >
      {/*{console.log("bookmarks:" + bookmarks)}*/}
      {/*<Modal.Header>Should probably have a title somewhere</Modal.Header>*/}
      {/*<Modal.Content>*/}
      {/*TODO: make grid Expand to next page. Filter via passing in page number then map via passing in a page*/}
      <div className="Group grid">
        {/*{bookmarks.map((bookmark) => {*/}
        {/*  return (*/}
        {/*    <Bookmark*/}
        {/*      key={bookmark._id}*/}
        {/*      userId={userId}*/}
        {/*      inEditMode={inEditMode}*/}
        {/*      url={bookmark.url}*/}
        {/*      name={bookmark.name}*/}
        {/*      location={undefined}*/}
        {/*      icon={bookmark.icon}*/}
        {/*      customIcon={bookmark.customIcon}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
        <Board
          size={9}
          userId={userId}
          bookmarks={bookmarks.filter(bookmark => bookmark.pageIndex === page)}
          groups={[]}
          handleMoveBookmark={handleMoveBookmark}
          handleRemoveBookmark = {handleRemoveBookmark}
          indexHasNoBookmarks = {indexHasNoBookmarks}
        />
      </div>
      <div>
        Page {page}
      </div>
      <Button disabled={page === 0} inverted content='Previous' icon='left arrow' labelPosition='left' onClick={() => setPage(page - 1)}/>
      <Button inverted content='Next' icon='right arrow' labelPosition='right' onClick={() => setPage(page + 1)}/>
      {/*</Modal.Content>*/}
      {/*//TODO: add Title @bottom*/}
    </Modal>
  );
};

export default Group;
