import React from 'react'
import Grid from "./Grid";
import Bookmark from "./Bookmark";
import Group from "./Group";
import './Board.css';
const squares = []
const addGrid = (i, bookmarks, groups) => {
  //TODO: Check if there is an element at index i
  // console.log("ALRIGHT NOW")
  // console.log(bookmarks)
  // console.log(groups)
  const bookmarkAtIndex = bookmarks.filter((bookmark) => bookmark.index === i); //get bookmark with index i if exist
  const groupAtIndex = groups.filter((group) => group.index === i); //get group with index i if exist
  const hasBookmark = bookmarkAtIndex.length;
  const hasGroup = groupAtIndex.length;
  //element is a bookmark if it exist, or group, otherwise, nothing there
  const element = hasBookmark ? (
    bookmarkAtIndex[0]
  ) : hasGroup ? (
    groupAtIndex[0]
  ) : null;
  console.log(element)
  return (
    <div className={"grid-individual"} key={i}>
      {/*WHY CAN"T HAVE OBJECT??? and added multiple times?? */}
      {/*<Grid element={element}/>*/}
      {null}
    </div>

  );
}

const Board = ({ bookmarks, groups }) =>{
  for (let i = 0; i < 2; i++) {
    squares.push(addGrid(i, bookmarks,groups))
    addGrid(i,bookmarks,groups)
    console.log(squares.length)
  }
  return (
    <div className={"whole-board"}>
      {/*{console.log("board")}*/}
      {/*{console.log(squares)}*/}
      {squares}
      {/*{squares.map((square) => <div className={"grid-individual"} key={square}>*/}
      {/*  {square} </div>)}*/}
    </div>
  )
}

export default Board;