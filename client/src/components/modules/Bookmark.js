import React, { useState, useEffect, useRef } from "react";
import "./Bookmark.css";
import "../../utilities.css";
import { Button, Menu, Popup } from "semantic-ui-react";
import globe from "../../public/images/globe.png";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../pages/Home";

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
const Bookmark = ({ userId, inEditMode, url, name, icon, customIcon, index, onRemove, _id }) => {
  const contextRef = useRef();
  const [open, setOpen] = useState(false);
  const [displayedIcon, setDisplayedIcon] = useState(globe);

  useEffect(() => {
    if (customIcon) {
      //console.log("the custom icon object (should not a binary file) in the bookmark: " + customIcon + " " + name);
      setDisplayedIcon(customIcon);
    } else {
      setDisplayedIcon(icon);
    }
  });

  useEffect(() => {
    watchBookmark();
  }, [inEditMode]);

  const watchBookmark = () => {};

  function createContextFromEvent(e) {
    const left = e.clientX;
    const top = e.clientY;
    const right = left + 1;
    const bottom = top + 1;

    return {
      getBoundingClientRect: () => ({
        left,
        top,
        right,
        bottom,

        height: 0,
        width: 0,
      }),
    };
  }

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
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div>
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
              cursor: isDragging ? "grabbing" : "grab",
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
      <Popup basic context={contextRef} onClose={() => setOpen(false)} open={open}>
        <Menu
          items={[{ key: "delete", content: "Delete", icon: "remove" }]}
          onItemClick={() => {
            onRemove();
            setOpen(false);
          }}
          secondary
          vertical
        />
      </Popup>
      {inEditMode && <Button size="tiny" inverted circular icon="close" onClick={onRemove} />}
    </div>
  );
};

export default Bookmark;
