import React, {useRef, useEffect} from "react";
import "./Bookmark.css"
import { Button } from 'semantic-ui-react';

const CollapsedGroup = ({

                 onClick }) => {

  // useEffect(() => {
  //   watchBookmark();
  // }, [inEditMode]);
  //
  // // Draws a board to the canvas
  // const watchBookmark = () => {
  //
  // }

  return (
      <Button size={"big"} onClick={onClick}>Show Modal</Button>
  );
}

export default CollapsedGroup;