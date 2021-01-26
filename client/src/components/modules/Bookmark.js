import React, { useState, useEffect, useRef } from "react";
import "./Bookmark.css";
import "../../utilities.css";
import { Button, Icon, Input, Menu, Popup } from "semantic-ui-react";
import globe_light from "../../public/images/globe_light.png";
import globe_dark from "../../public/images/globe_dark.png";
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
  handleMoveBookmarkToNewPage,
  handleMoveBookmarkOut,
  groupID,
  _id,
  isDarkMode
}) => {

  const contextRef = useRef();
  const [state, setState] = useState({
    open: false,
    displayedIcon: globe_light,
    newPageValue: "",
    errored: false,
  });
  
  useEffect(() => {
    let displayedIcon =  icon;
    if (customIcon) {
      //console.log("the custom icon object (should not a binary file) in the bookmark: " + customIcon + " " + name);
      displayedIcon = customIcon;
    } else if (icon && icon === globe_light) {
      displayedIcon = (isDarkMode ? globe_light : globe_dark); 
    }
    setState({ ...state, displayedIcon: displayedIcon })
  }, [isDarkMode, icon, customIcon]);

  const getURL = () => {
    if (url.toLowerCase().includes("https://") || url.toLowerCase().includes("http://")) {
      return url;
    }
    return "http://" + url.replace(new RegExp("((http|https)://)?(www.)?"), "");
  }

  const handleError = () =>{
    if (!state.errored) {
      setState({
        ...state,
        displayedIcon: (isDarkMode ? globe_light : globe_dark),
        errored: true,
      });
    }
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
      <a
        href={getURL()}
        target="_blank"
      >
        <button
          disabled={inEditMode}
          className="Bookmark-button u-flex-alignCenter"
          type="submit"
          onContextMenu={(e) => {
            e.preventDefault();
            contextRef.current = createContextFromEvent(e);
            setState({ ...state, open: true });
          }}
        >
          <img
            ref={drag}
            id="bookmarkImage"
            style={{
              opacity: isDragging ? 0 : 1,
              fontSize: 25,
              fontWeight: "bold",
              cursor: isDragging ? "grabbing" : inEditMode ? "grab" : "pointer",
              borderRadius: "20%",
            }}
            className="Bookmark-image u-flex-alignCenter u-grow"
            src={state.displayedIcon}
            onError={handleError}
          />
          {/*<div className="Bookmark-text-container u-flex-alignCenter">*/}

          {/*</div>*/}
        </button>
        <p className="Bookmark-text u-bold " style={{ opacity: isDragging ? 0 : 1,  color: isDarkMode? "whitesmoke":"black"}}>
          {name}
        </p>
      </a>

      {/*//TODO: make popup not blurry*/}
      <Popup inverted={!!isDarkMode} basic context={contextRef} onClose={() => setState({ ...state, open: false})} open={state.open} closeOnPortalMouseLeave={false}>
        <Menu secondary vertical inverted={!!isDarkMode}>
          <Menu.Item
            onClick={() => {
              groupID ? removeBookmarkFromGroup(groupID, _id) : onRemove();
              setState({ ...state, open: false});
              console.log(groupID);
            }}
          >
            Delete
            <Icon name={"trash"} />
          </Menu.Item>
          <Menu.Item>
            <Input
              inverted={!!isDarkMode}
              min="1"
              style={{ width: "11em" }}
              type="number"
              placeholder="Move to page..."
              onChange={(event, data) => setState({ ...state, newPageValue: data.value })}
            >
              <input />
              <Button
                inverted={!!isDarkMode}
                type="submit"
                icon={"paper plane"}
                onClick={() => handleMoveBookmarkToNewPage(_id,parseInt(state.newPageValue)-1,groupID)}
              />
            </Input>
            {/*<Input type={"number"} style ={{width: "10em"}}  icon={}*/}
            {/*       placeholder='Move to page...'>*/}
            {/*</Input>*/}
          </Menu.Item>
          {/*  TODO: show/edit URL on right click*/}
          {groupID?
            <Menu.Item
              onClick={() => {
                handleMoveBookmarkOut(groupID, _id);
                setState({ ...state, open: false});
                console.log(groupID);
              }}
            >
              Move Out of Group
              <Icon name={"share square"} />
            </Menu.Item>: null}

        </Menu>
      </Popup>
    </div>
  );
};

export default Bookmark;
