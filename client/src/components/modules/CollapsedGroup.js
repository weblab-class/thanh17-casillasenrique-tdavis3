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
                src={"https://www.google.com/s2/favicons?sz=256&domain_url=https://docs.google.com/document/d/1pEK09l2d_fh6XDxhdAxn57ZehPwBNAruNlaY4p41iVw/edit#heading=h.x525g2g7gykp"}
              /> </div>
            })}
          </div>
      </button>
        <p className="Bookmark-text u-bold ">{name}</p>
    </div>
);
}

export default CollapsedGroup;