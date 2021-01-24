import React, { useRef, useEffect } from "react";
import "./Bookmark.css";
import { Button, Icon } from "semantic-ui-react";
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
  return (
    <div style={{
      opacity: isDragging? 0:1,
      cursor: isDragging? 'grabbing': "grab"
    }} className=" u-grow" >
      <div ref={drag}>
        <div style={{display:"flex",justifyContent:"flex-end", outline: "none !important"}}>
          {inEditMode && <Button size="mini" circular compact={true} icon="close" onClick={onRemove} />}
        </div>
      <button style={{cursor: isDragging? 'grabbing': "grab"}} className="CollapsedGroup-button u-flex-alignCenter" onClick={onClick}>
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
