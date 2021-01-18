import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon from "../../public/images/bookmark.png";
import fileUpload from "../../public/images/fileUpload.png";
import "./IconSelect.css";

const defaultIconLoader = (
  <Loader className="ui active centered inline" size="large">
    Enter a URL
  </Loader>
);

const IconSelect = ({ onSelect, defaultIcon }) => {
  const [selected, setSelected] = useState("standard");

  return (
    <div className="IconSelect-container">
      <div className={"IconSelect-standard" + (selected === "standard" ? "-selected" : "")}>
        <img
          src={standardIcon}
          onClick={() => {
            console.log("clicked on standard");
            onSelect(standardIcon);
            setSelected("standard");
          }}
        />
      </div>
      <div>
        {!defaultIcon ? (
          defaultIconLoader
        ) : (
          <img
            className="IconSelect-default"
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
        <button type="file" accept="image/*">
          <img className="NewBookmarkForm-Upload" src={fileUpload} />
        </button>
      </div>
    </div>
  );
};

export default IconSelect;
