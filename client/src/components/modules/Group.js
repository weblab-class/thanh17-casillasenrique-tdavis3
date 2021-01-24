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
                 onRemove,
                 removeBookmarkFromGroup,
                 moveBookmarksInGroup,
                 indexHasNoBookmarks}) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
  },[bookmarks]);


  const [page, setPage] = useState(0);

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

  /** Return a boolean indicating whether there is a boolean at index index
   *
   * @param groupID ID of the group
   * @param index index of the desired moving location
   * @returns {boolean} indicating whether there is another bookmark at index
   */
  const indexHasNoBookmarksInGroup = (groupID,index) => {
    const filteredBookmarks = bookmarks.filter((bookmark) => bookmark.index === index && bookmark.pageIndex === page)
    // console.log(filteredBookmarks.length)
    return filteredBookmarks.length === 0;
  }
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
          onRemove={onRemove}
          inEditMode={inEditMode}
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
          moveBookmarksInGroup={moveBookmarksInGroup}
          removeBookmarkFromGroup= {removeBookmarkFromGroup}
          indexHasNoBookmarks = {indexHasNoBookmarks}
          indexHasNoBookmarksInGroup={indexHasNoBookmarksInGroup}
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
      <header style={{
        fontSize: "xxx-large",
        color: "white",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom:"-10%"}}>
        {name}
      </header>
    </Modal>
    </>
  );
};

export default Group;
