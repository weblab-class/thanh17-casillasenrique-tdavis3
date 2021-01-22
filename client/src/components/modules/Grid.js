import React, { useContext, useEffect, useState } from "react";
import "../../utilities.css";
import { useDrop } from 'react-dnd'
import { ItemTypes } from "../pages/Home";
import Bookmark from "./Bookmark";
import Group from "./Group";
import "./Grid.css"

const Grid = ({handleMoveBookmark,handleMoveGroup, index, element, type, userId, inEditMode, width, height}) => {

  // useEffect(() => {
  // },[])
  //



  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.BOOKMARK, ItemTypes.GROUP],
    drop: (item) =>
      item.type === ItemTypes.GROUP ? handleMoveGroup(item._id,index):
        handleMoveBookmark(item._id,index),
    // console.log(item),
    // canDrop: () => indexHasNoBookmarks(index),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      // key = { element && element.index}
      className={"grid-individual"}
      ref={drop}
      style={{
        width: width,
        height: height,
        /*background-color: #396dff;*/
        outline: "white solid",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: isOver? "white": "transparent"
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
        // onRemove={() => handleRemoveBookmark(bookmark._id)}
      /> : null}
      {type === ItemTypes.GROUP?
      <Group
        _id = {element._id}
        bookmarks={element.bookmarks}
        inEditMode={inEditMode}
        userId={userId}
        name= {element.name}
        index = {element.index}
        />: null
      }
    </div>
  )
}

export default Grid