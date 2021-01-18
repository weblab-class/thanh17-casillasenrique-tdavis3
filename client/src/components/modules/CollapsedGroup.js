import React, {useRef, useEffect} from "react";
import "./Bookmark.css"
import { Button, Icon } from "semantic-ui-react";
import "./CollapsedGroup.css";

const CollapsedGroup = ({
                          name,
                          bookmarkIcons,
                        onClick}) => {

  return (
    <div className=" u-grow">
      <button className="CollapsedGroup-button u-flex-alignCenter" onClick={onClick}>
         {/* <Icon name='world' size='huge' color="pink"/> */}
          <div className="CollapsedGroup grid">
            {bookmarkIcons.map((icon) => {
              console.log(icon);
              return  <div style={{textAlign: "center"}}><img className="CollapsedGroup-minimizedIcon"
                src={icon}
              /> </div>
            })}
          </div>
      </button>
        <p className="Bookmark-text u-bold ">{name}</p>
    </div>
);
}

export default CollapsedGroup;