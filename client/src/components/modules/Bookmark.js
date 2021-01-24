import React, { useState, useEffect, useRef } from "react";
import "./Bookmark.css";
import "../../utilities.css";
import { Button, Icon, Input, Menu, Popup } from "semantic-ui-react";
import globe from "../../public/images/globe.png";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../pages/Home";
import { createContextFromEvent } from "../../utilities";

const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";

/** A bookmark object that takes in urls and all properties that exist for a bookmark and render
 * it
 *
 * @param userId ID of the Google user
 * @param inEditMode boolean value indicating whether the bookmark is in edit mode or not
 * @param url the url for the specific bookmark
 * @param name the custom name label for the bookmark
 * @param image the image representing the icon of the bookmark
 * @param location the location of the bookmark
 * @returns {JSX.Element}
 * @constructor
 */
const Bookmark = ({
  userId,
  inEditMode,
  url,
  name,
  icon,
  customIcon,
  index,
  onRemove,
  removeBookmarkFromGroup,
  groupID,
  _id,
}) => {
  const contextRef = useRef();
  const [open, setOpen] = useState(false);
  const [displayedIcon, setDisplayedIcon] = useState(globe);

  useEffect(() => {
    if (customIcon) {
      //console.log("the custom icon object (should not a binary file) in the bookmark: " + customIcon + " " + name);
      setDisplayedIcon(customIcon);
    } else if (icon) {
      setDisplayedIcon(icon);
    }
  });

  useEffect(() => {
    watchBookmark();
  }, [inEditMode]);

  const watchBookmark = () => {};

  /**
   * Turns a Bookmark into a dragable component
   */
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.BOOKMARK,
      _id: _id,
      // customRow: customRow,
      // customCol: customCol,
      index: index,
    },
    canDrag: inEditMode,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div style={{ filter: "blur(0)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          outline: "none !important",
          filter: "blur(0)",
        }}
      >
        {inEditMode && (
          <Button
            size="mini"
            circular
            compact={true}
            icon="close"
            onClick={groupID ? () => removeBookmarkFromGroup(groupID, _id) : onRemove}
          />
        )}
      </div>
      <form
        action={"http://" + url.replace(new RegExp("((http|https)://)?(www.)?"), "")}
        target="_blank"
      >
        <button
          disabled={inEditMode}
          className="Bookmark-button u-flex-alignCenter"
          type="submit"
          onContextMenu={(e) => {
            e.preventDefault();
            contextRef.current = createContextFromEvent(e);
            setOpen(true);
          }}
        >
          <img
            ref={drag}
            style={{
              opacity: isDragging ? 0 : 1,
              fontSize: 25,
              fontWeight: "bold",
              cursor: isDragging ? "grabbing" : inEditMode ? "grab" : "pointer",
              borderRadius: "20%",
            }}
            className="Bookmark-image u-flex-alignCenter u-grow"
            src={displayedIcon}
          />
          {/*<div className="Bookmark-text-container u-flex-alignCenter">*/}

          {/*</div>*/}
        </button>
        <p className="Bookmark-text u-bold " style={{ opacity: isDragging ? 0 : 1 }}>
          {name}
        </p>
      </form>

      {/*//TODO: make popup not blurry*/}
      <Popup basic context={contextRef} onClose={() => setOpen(false)} open={open}>
        <Menu secondary vertical>
          <Menu.Item
            onClick={() => {
              groupID ? removeBookmarkFromGroup(groupID, _id) : onRemove();
              setOpen(false);
              console.log(groupID);
            }}
          >
            Delete
            <Icon name={"remove"} />
          </Menu.Item>
          <Menu.Item >
            <Button  icon={'paper plane'}/>
            {/*<Input type={"number"} style ={{width: "10em"}}  icon={}*/}
            {/*       placeholder='Move to page...'>*/}
            {/*</Input>*/}
          </Menu.Item>
        </Menu>
      </Popup>
    </div>
  );
};

export default Bookmark;
