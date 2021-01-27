import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon_light from "../../public/images/globe_light.png";
import standardIcon_dark from "../../public/images/globe_dark.png";
import fileUpload_light from "../../public/images/fileUpload_light.png";
import fileUpload_dark from "../../public/images/fileUpload_dark.png";
import "./IconSelect.css";

const defaultIconLoader = "";

const SELECTION = {
  STANDARD: "standard",
  DEFAULT: "default",
  UPLOAD: "upload",
};

/**
 *
 * @param onSelect callback that is used when user select certain icons
 * @param defaultIcon The default Icon that is used for a bookmark
 * @returns {JSX.Element} selections of icons to choose from for the bookmark
 * @constructor
 */
const IconSelect = ({ onSelect, defaultIconURL, isDarkMode, onError }) => {
  const [selected, setSelected] = useState(SELECTION.STANDARD);

  useEffect(() => {
    if (selected === SELECTION.DEFAULT && defaultIconURL === undefined) {
      console.log("changing selection as default url doesnt exist anymore");
      onSelect({ icon: standardIcon_light, isUpload: false });
      setSelected(SELECTION.STANDARD);
    }
  }, [selected, defaultIconURL]);

  const handleError = () => {
    if (selected === SELECTION.DEFAULT) {
      console.log("error, selected was default");
      onError(true);
      setSelected(SELECTION.STANDARD);
    } 
    onError(false);
  };

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
            src={isDarkMode ? standardIcon_light : standardIcon_dark}
            onClick={() => {
              onSelect({ icon: standardIcon_light, isUpload: false });
              setSelected(SELECTION.STANDARD);
            }}
          />
        </div>
      </div>
      <div>
        {!defaultIconURL ? (
          <Loader
            className={
              "IconSelect ui active centered inline IconSelect ui loader" +
              (!isDarkMode ? " light" : "")
            }
            size="small"
          >
            <p
              className="IconSelect-default-loader"
              style={{ color: isDarkMode ? "white" : "black" }}
            >
              Enter a URL
            </p>
          </Loader>
        ) : (
          <div
            className={"IconSelect-option" + (selected === SELECTION.DEFAULT ? "-selected" : "")}
          >
            <img
              style={{
                width: "4vw",
                height: "4vw",
                borderRadius: "20%",
              }}
              src={defaultIconURL}
              onClick={() => {
                onSelect({ icon: defaultIconURL, isUpload: false });
                setSelected(SELECTION.DEFAULT);
              }}
              onError={handleError}
            />
          </div>
        )}
      </div>
      <label
        className={"IconSelect-option" + (selected === SELECTION.UPLOAD ? "-selected" : "")}
        onClick={() => {
        }}
      >
        <img
          src={
            selected === SELECTION.UPLOAD && document.getElementById("fileElem").files.length > 0
              ? URL.createObjectURL(document.getElementById("fileElem").files[0])
              : isDarkMode
              ? fileUpload_light
              : fileUpload_dark
          }
          className="IconSelect-fileUploadImage"
        />
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          className="IconSelect-invisibleInput"
          onChange={(event) => {
            if (event.target.files[0]) {
              console.log("set selected to upload");
              onSelect({ icon: event.target.files[0], isUpload: true });
              setSelected(SELECTION.UPLOAD);
            }
          }}
        />
      </label>
    </div>
  );
};

export default IconSelect;
