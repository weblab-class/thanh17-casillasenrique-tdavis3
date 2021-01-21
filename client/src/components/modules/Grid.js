import React, { useContext, useEffect, useState } from "react";
import "../../utilities.css";
import { useDrop } from 'react-dnd'
import { ItemTypes } from "../pages/Home";
import Bookmark from "./Bookmark";
import Group from "./Group";
import "./Grid.css"

const Grid = ({handleMoveGroup, index, element, type, userId, inEditMode}) => {
  // const moveElement = (item,x,y) => {
  //   // const element = this.state.bookmarks.filter((bookmark) => bookmark._id === _id);
  //   //TODO: change the bookmark's location to the new one
  //
  //   //bookmark[row_index].row = new row
  //   // handleRemoveBookmark(_id)
  //
  // }
  // /**
  //  * Drop location for elements
  //  */

  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.BOOKMARK, ItemTypes.GROUP],
    drop: (item) =>
      //TODO: replace with _id?
      handleMoveGroup(item.index,index),
    // console.log(item.index),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      className={"grid-individual"}
      ref={drop}
      style={{
        width: "12.5%",
        height:"17%",
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