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
                 removeBookmarkFromGroup,
                 indexHasNoBookmarks}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
  },[bookmarks]);

  const [page, setPage] = useState(0);

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
    canDrag: inEditMode,
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
    <>


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
      <div className={"Group grid"}>
        <Board
          groupID={_id}
          inEditMode={inEditMode}
          size={9}
          userId={userId}
          bookmarks={bookmarks.filter(bookmark => bookmark.pageIndex === page)}
          groups={[]}
          handleMoveBookmark={handleMoveBookmark}
          removeBookmarkFromGroup= {removeBookmarkFromGroup}
          indexHasNoBookmarks = {indexHasNoBookmarks}
        />
      </div>
      <div style={{
        color: "white",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "50%"}}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Button disabled={page === 0} size={"huge"} inverted icon='angle left' onClick={() => setPage(page - 1)}/>
          <div style={{paddingRight:"48vw"}}/>
          <Button inverted icon='angle right' size={"huge"} onClick={() => setPage(page + 1)}/>
        </div>

      </div>

      <div style={{
        fontSize: "larger",
        color: "white",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        top:"-5%"}}>
        Page {page}
      </div>
      {/*</Modal.Content>*/}
      {/*//TODO: add Title @bottom*/}
    </Modal>
    </>
  );
};

export default Group;
