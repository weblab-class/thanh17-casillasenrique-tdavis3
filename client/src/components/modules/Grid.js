import React from 'react'
import "../../utilities.css";
import { useDrop } from 'react-dnd'
import { ItemTypes, moveElement } from "../pages/Home";
import Bookmark from "./Bookmark";
import Group from "./Group";
const Grid = ({ x, y, element }) => {



  // const moveBookmark = (_id,x,y) => {
  //   const bookmark = this.state.bookmarks.filter((bookmark) => bookmark._id === _id);
  //   //TODO: change the bookmark's location to the new one
  //
  //   //bookmark[row_index].row = new row
  //   // handleRemoveBookmark(_id)
  //
  // }
  /**
   * Drop location for elements
   */
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOOKMARK,
    drop: (item,monitor) =>
      moveElement(item,x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity: isOver ? '0.8': '0'
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
      {element}
    </div>
  )
}

export default Grid