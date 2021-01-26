import React, { useContext, useEffect, useState } from "react";
import "../../utilities.css";
import { useDrop } from 'react-dnd'
import { ItemTypes } from "../pages/Home";
import Bookmark from "./Bookmark";
import Group from "./Group";
import "./Grid.css"

/** A droppable element that together builds a board for our bookmarks manager interface
 *
 * @param index location of the Grid item wrt to other Grid objects
 * @param element either a Bookmark or Group object
 * @param type ItemsType object indicating the type of element
 * @param userId the Google ID
 * @param inEditMode boolean representing whether the Grid can be edited/dragged or not
 * @param width the percentage of a grid width according to whether this is in a group or home screen
 * @param height the percentage of a grid height according to whether this is in a group or home screen
 * @param handleMoveGroup callback that will move the group after DnD
 * @param handleMoveBookmark callback that will move the bookmark after DnD
 * @param handleRemoveBookmark callback that will remove the bookmark after DnD
 * @param indexHasNoBookmarks callback that determines whether there is a bookmark
 *        at the desired drop location
 * @param indexHasNoElements callback that determines whether there is an element
 *        at the desired drop location
 * @returns {JSX.Element}
 * @constructor
 */
const Grid = ({
                index,
                element,
                type,
                userId,
                groupID,
                inEditMode,
                width,
                height,
                handleMoveGroup,
                handleMoveBookmark,
                handleMoveBookmarkToNewPage,
                handleMoveGroupToNewPage,
                handleMoveBookmarkOut,
                moveBookmarksInGroup,
                handleRemoveBookmark,
                handleRemoveGroup,
                removeBookmarkFromGroup,
                indexHasNoBookmarks,
                indexHasNoElements,
                indexHasNoBookmarksInGroup,
                isDarkMode}) => {

  // useEffect(() => {
  // },[])
  //



  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.BOOKMARK, ItemTypes.GROUP],
    drop: (item) =>
      item.type === ItemTypes.GROUP ? handleMoveGroup(item._id,index):
        (groupID ? moveBookmarksInGroup(groupID,item._id,index)
          : handleMoveBookmark(item._id,index)),
    // console.log(item),
    canDrop: (item) =>
      item.type ===ItemTypes.BOOKMARK?
        (groupID? indexHasNoBookmarksInGroup(groupID,index) : indexHasNoBookmarks(index))
        : indexHasNoElements(index),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      // key = { element && element.index}
      className={groupID? "grid-individual-group": "grid-individual"}
      ref={drop}
      style={{
        /*background-color: #396dff;*/
        // outline: "white solid",
        // display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        // flexShrink: "0",
      }}
    >
      {/*{isOver && (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      top: 0,*/}
      {/*      left: 0,*/}
      {/*      height: '100%',*/}
      {/*      width: '100%',*/}
      {/*      zIndex: 1,*/}
      {/*      opacity: 0.5,*/}
      {/*      backgroundColor: 'yellow',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      {type === ItemTypes.BOOKMARK? <Bookmark
        groupID={groupID}
        _id = {element._id}
        userId={userId}
        inEditMode={inEditMode}
        url={element.url}
        name={element.name}
        icon={element.icon}
        customIcon={element.customIcon}
        customRow = {element.customRow}
        customCol={element.customCol}
        index={element.index}
        onRemove={() => handleRemoveBookmark(element._id)}
        handleMoveBookmarkOut={handleMoveBookmarkOut}
        removeBookmarkFromGroup={removeBookmarkFromGroup}
        handleMoveBookmarkToNewPage = {handleMoveBookmarkToNewPage}
        isDarkMode={isDarkMode}
      /> : null}
      {type === ItemTypes.GROUP?
      <Group
        _id = {element._id}
        bookmarks={element.bookmarks}
        inEditMode={inEditMode}
        userId={userId}
        name= {element.name}
        index = {element.index}
        onRemove={() => handleRemoveGroup(element._id)}
        moveBookmarksInGroup={moveBookmarksInGroup}
        handleMoveBookmarkToNewPage={ handleMoveBookmarkToNewPage}
        handleMoveGroupToNewPage={handleMoveGroupToNewPage}
        handleMoveBookmarkOut={handleMoveBookmarkOut}
        removeBookmarkFromGroup={removeBookmarkFromGroup}
        indexHasNoBookmarks={indexHasNoBookmarks}
        indexHasNoBookmarksInGroup={indexHasNoBookmarksInGroup}
        isDarkMode={isDarkMode}
        />: null
      }
    </div>
  )
}

export default Grid