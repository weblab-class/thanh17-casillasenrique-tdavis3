import React, {useRef, useEffect} from "react";
import "./Bookmark.css"
import { Button, Icon } from "semantic-ui-react";

const CollapsedGroup = ({
                          userId,
                          inEditMode,
                          name,
                          location,
                        onClick}) => {

  // useEffect(() => {
  //   watchBookmark();
  // }, [inEditMode]);
  //
  // // Draws a board to the canvas
  // const watchBookmark = () => {
  //
  // }

  return (


  <div >
    <button className="Bookmark-button u-flex-alignCenter" onClick={onClick}>
      <Icon name='world' size='huge' color="pink"/>
    </button>
    <p className="Bookmark-text u-bold ">{name}</p>

  </div>
);
}

export default CollapsedGroup;