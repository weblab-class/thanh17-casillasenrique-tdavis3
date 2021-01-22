import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon from "../../public/images/globe.png";
import fileUpload from "../../public/images/fileUpload.png";
import "./IconSelect.css";

const defaultIconLoader = (
  <Loader className="ui active centered inline" size="small">
    <p className="IconSelect-default-loader">Enter a URL</p>
  </Loader>
);

const SELECTION = {
  STANDARD: "standard",
  DEFAULT: "default",
  UPLOAD: "upload",
}

/**
 *
 * @param onSelect callback that is used when user select certain icons
 * @param defaultIcon The default Icon that is used for a bookmark
 * @returns {JSX.Element} selections of icons to choose from for the bookmark
 * @constructor
 */
const IconSelect = ({ onSelect, defaultIconURL }) => {
  const [selected, setSelected] = useState(SELECTION.STANDARD);

  useEffect(() => {
    if (selected === SELECTION.DEFAULT && defaultIconURL === undefined) {
      console.log("changing selection as default url doesnt exist anymore");
      onSelect({icon: standardIcon, isUpload: false});
      setSelected(SELECTION.STANDARD);
    }
  }, [selected, defaultIconURL]);

  return (
    <div className="IconSelect-container">
      <div className={"IconSelect-option" + (selected === SELECTION.STANDARD ? "-selected" : "")}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <img
            className={"IconSelect-bookmarkImage"}
            src={standardIcon}
            onClick={() => {
              console.log("clicked on standard");
              onSelect({icon: standardIcon, isUpload: false});
              setSelected(SELECTION.STANDARD);
            }}
          />
        </div>
      </div>
      <div>
        {!defaultIconURL ? (
          defaultIconLoader
        ) : (
          <div className={"IconSelect-option" + (selected === SELECTION.DEFAULT ? "-selected" : "")}>
            <img
              style={{
                width: "4vw",
                height: "4vw",
                borderRadius: "20%",
              }}
              src={defaultIconURL}
              onClick={() => {
                console.log("clicked on default");
                onSelect({icon: defaultIconURL, isUpload: false});
                setSelected(SELECTION.DEFAULT);
              }}
            />
          </div>
        )}
      </div>
      <label
        className={"IconSelect-option" + (selected === SELECTION.UPLOAD ? "-selected" : "")}
        onClick={() => {
          console.log("clicked on default");
          setSelected(SELECTION.UPLOAD);
          console.log(document.getElementById("fileElem").files[0]);
        }}
      >
        <img
          src={
            selected === SELECTION.UPLOAD && document.getElementById("fileElem").files.length > 0
              ? URL.createObjectURL(document.getElementById("fileElem").files[0])
              : fileUpload
          }
          className="IconSelect-fileUploadImage"
        />
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          className="IconSelect-invisibleInput"
          onChange={(event) => {
            onSelect({icon: event.target.files[0], isUpload: true});
          }}
        />
      </label>
    </div>
  );
};

export default IconSelect;
