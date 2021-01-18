import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon from "../../public/images/bookmark.png";
import fileUpload from "../../public/images/fileUpload.png";
import "./IconSelect.css";

const defaultIconLoader = (
  <Loader className="ui active centered inline" size="large">
    <text fontSize={1}>Enter a URL</text>
  </Loader>
);

/**
 *
 * @param onSelect callback that is used when user select certain icons
 * @param defaultIcon The default Icon that is used for a bookmark
 * @returns {JSX.Element} selections of icons to choose from for the bookmark
 * @constructor
 */
const IconSelect = ({ onSelect, defaultIcon }) => {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="IconSelect-container">
      <div className={"IconSelect-standard" + (selected === "standard" ? "-selected" : "")}>
        <img
          className={"bookmarkImage"}
          src={standardIcon}
          onClick={() => {
            console.log("clicked on standard");
            onSelect(standardIcon);
            setSelected("standard");
          }}
        />
      </div>
      <div >
        {!defaultIcon ? (
          defaultIconLoader
        ) : (
          <img
            style={{width: "4vw",
              height: "4vw", borderRadius: "20%"}}
            className= {"IconSelect-default" + (selected === "default" ? "-selected" : "")}
            src={defaultIcon}
            onClick={() => {
              console.log("clicked on default");
              onSelect(defaultIcon);
              setSelected("default");
            }}
          />
        )}
      </div>
      <div>
        <button type="file" >
          <img className= {"NewBookmarkForm-Upload"} src={fileUpload} />
        </button>
      </div>
    </div>
  );
};

export default IconSelect;
