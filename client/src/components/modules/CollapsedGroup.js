import React, { useRef, useEffect, useState } from "react";
import "./Bookmark.css";
import { Button, Icon, Input, Menu, Popup } from "semantic-ui-react";
import { createContextFromEvent } from "../../utilities";
import "./CollapsedGroup.css";

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
  handleMoveGroupToNewPage
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
        cursor: isDragging ? "grabbing" : inEditMode ? "grab" : "pointer",
      }}
      
    >
      <div style={{ display: "flex", justifyContent: "flex-end", outline: "none !important" }}>
          {inEditMode && (
            <Button size="mini" circular compact={true} icon="close" onClick={onRemove} />
          )}
        </div>
      <div className="u-grow-small" ref={drag}>
        
        <button
          style={{ cursor: isDragging ? "grabbing" : inEditMode ? "grab" : "pointer" }}
          className="CollapsedGroup-button u-flex-alignCenter"
          onClick={onClick}
          onContextMenu={(e) => {
            e.preventDefault();
            contextRef.current = createContextFromEvent(e);
            setOpen(true);
          }}
        >
          {/* <Icon name='world' size='huge' color="pink"/> */}
          <div className="CollapsedGroup grid">
            {bookmarkIcons.map((icon, i) => {
              return (
                <div key={i} style={{ textAlign: "center" }}>
                  <img className="CollapsedGroup-minimizedIcon" src={icon} />
                </div>
              );
            })}
          </div>
        </button>
        <Popup basic context={contextRef} onClose={() => setOpen(false)} open={open} closeOnPortalMouseLeave={false}>
          <Menu secondary vertical>
            <Menu.Item
              onClick={() => {
                onRemove();
                setOpen(false);
              }}
            >
              Delete
              <Icon name={"remove"} />
            </Menu.Item>
            <Menu.Item>
              <Input
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
        <p className="Bookmark-text u-bold ">{name}</p>
      </div>
      
    </div>
  );
};

export default CollapsedGroup;
