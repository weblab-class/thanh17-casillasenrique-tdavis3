import React, { useRef, useEffect, useState } from "react";
import "./Bookmark.css";
import { Button, Icon, Menu, Popup } from "semantic-ui-react";
import "./CollapsedGroup.css";

/**
 *
 * @param name
 * @param bookmarkIcons
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
const CollapsedGroup = ({name, bookmarkIcons, onClick,drag, isDragging,inEditMode, onRemove }) => {
  const contextRef = useRef();
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      opacity: isDragging? 0:1,
      cursor: isDragging? 'grabbing': (inEditMode? "grab": "pointer")
    }} className=" u-grow" >
      <div ref={drag}>
        <div style={{display:"flex",justifyContent:"flex-end", outline: "none !important"}}>
          {inEditMode && <Button size="mini" circular compact={true} icon="close" onClick={onRemove} />}
        </div>
        <Popup basic context={contextRef} onClose={() => setOpen(false)} open={open} >
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
      <button style={{cursor: isDragging? 'grabbing': (inEditMode? "grab": "pointer")}} className="CollapsedGroup-button u-flex-alignCenter" onClick={onClick}>
        {/* <Icon name='world' size='huge' color="pink"/> */}
        <div  className="CollapsedGroup grid">
          {bookmarkIcons.map((icon, i) => {
            return (
              <div key={i} style={{ textAlign: "center", }}>
                <img className="CollapsedGroup-minimizedIcon" src={icon} />
              </div>
            );
          })}
        </div>
      </button>
      </div>
      <p className="Bookmark-text u-bold ">{name}</p>

    </div>
  );
};

export default CollapsedGroup;
