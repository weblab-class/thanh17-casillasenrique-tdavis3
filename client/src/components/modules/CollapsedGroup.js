import React, { useRef, useEffect, useState } from "react";
import "./Bookmark.css";
import { Button, Icon, Input, Menu, Popup } from "semantic-ui-react";
import { createContextFromEvent } from "../../utilities";
import "./CollapsedGroup.css";
import globe_light from "../../public/images/globe_light.png";
import globe_dark from "../../public/images/globe_dark.png";

/**
 *
 * @param name
 * @param bookmarkIcons
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
const CollapsedGroup = ({
  _id,
  name,
  bookmarkIcons,
  onClick,
  drag,
  isDragging,
  inEditMode,
  onRemove,
  handleMoveGroupToNewPage,
  isDarkMode
}) => {
  const contextRef = useRef();
  const [open, setOpen] = useState(false);
  const [state,setState] = useState({
    newPageValue: ""
  })
  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
      }}

    >
      <div style={{ display: "flex", justifyContent: "flex-end", outline: "none !important" }}>
          {inEditMode && (
            <Button size="mini" circular compact={true} icon="close" onClick={onRemove} />
          )}
        </div>
      <div>
        
        <button
          ref={drag}
          style={{ cursor: isDragging ? "grabbing" : inEditMode ? "grab" : "pointer", backgroundColor: isDarkMode? "#1F222280":"#f5f5f580"}}
          className="CollapsedGroup-button u-flex-alignCenter u-grow-small"
          onClick={onClick}
          onContextMenu={(e) => {
            e.preventDefault();
            contextRef.current = createContextFromEvent(e);
            setOpen(true);
          }}
        >
          {/* <Icon name='world' size='huge' color="pink"/> */}
          <div className="CollapsedGroup grid">
            {[...bookmarkIcons].reverse().map((icon, i) => {
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <img className="CollapsedGroup-minimizedIcon" src={(icon === globe_light) ? (isDarkMode ? globe_light : globe_dark): icon}/>
                </div>
              );
            })}
          </div>
        </button>
        <p className="Bookmark-text u-bold " style={{color: isDarkMode? "whitesmoke":"black"}}>{name}</p>
      </div>
        <Popup inverted={!!isDarkMode} basic context={contextRef} onClose={() => setOpen(false)} open={open} closeOnPortalMouseLeave={false}>
          <Menu inverted={!!isDarkMode} secondary vertical>
            <Menu.Item
              onClick={() => {
                onRemove();
                setOpen(false);
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
                onChange={(event, data) => {
                  setState({newPageValue: data.value});
                } }
              >
                <input />
                <Button
                  inverted={!!isDarkMode}
                  type="submit"
                  icon={"paper plane"}
                  onClick={() => handleMoveGroupToNewPage(_id,parseInt(state.newPageValue)-1)}
                />
              </Input>
              {/*<Input type={"number"} style ={{width: "10em"}}  icon={}*/}
              {/*       placeholder='Move to page...'>*/}
              {/*</Input>*/}
            </Menu.Item>
            {/*  TODO: show/edit URL on right click*/}
          </Menu>
        </Popup>
    </div>
  );
};

export default CollapsedGroup;
