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

/**
 *
 * @param onSelect callback that is used when user select certain icons
 * @param defaultIcon The default Icon that is used for a bookmark
 * @returns {JSX.Element} selections of icons to choose from for the bookmark
 * @constructor
 */
const IconSelect = ({ onSelect, defaultIcon }) => {
  const [selected, setSelected] = useState("standard");
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (selected !== "upload") {
      setUploaded(false) 
    }
    if (selected === "default" && defaultIcon === undefined) {
      console.log("changing selection as default url doesnt exist anymore")
      setSelected("standard");
    }
  }, [selected, defaultIcon]);

  return (
    <div className="IconSelect-container">
      <div className={"IconSelect-option" + (selected === "standard" ? "-selected" : "")}>
        <div style={{display: "flex", alignItems: "center", justifyContent:"space-around",
        flexDirection: "column"}}>
          <img
            className={"IconSelect-bookmarkImage"}
            src={standardIcon}
            onClick={() => {
              console.log("clicked on standard");
              onSelect(standardIcon, "ICON");
              setSelected("standard");
            }}
          />
        </div>

      </div>
      <div >
        {!defaultIcon ? (
          defaultIconLoader
        ) : (
          <div className= {"IconSelect-option" + (selected === "default" ? "-selected" : "")}>
            <img 
              style={{width: "4vw",
              height: "4vw", borderRadius: "20%"}}
              src={defaultIcon}
              onClick={() => {
                console.log("clicked on default");
                onSelect(defaultIcon, "ICON");
                setSelected("default");
              }}
            />
          </div>
        )}
      </div>
          <label 
            className={"IconSelect-option" + ((selected === "upload") ? "-selected" : "")}
            onClick={() => {
                console.log("clicked on default");
                setSelected("upload");
                console.log(document.getElementById("fileElem").files[0]);
            }}
          >
            <img 
              src={(uploaded && document.getElementById("fileElem").files.length > 0) ? URL.createObjectURL(document.getElementById("fileElem").files[0]) : fileUpload} 
              className="IconSelect-fileUploadImage"
            />
            <input 
              type="file" 
              id="fileElem" 
              accept="image/*" 
              className="IconSelect-invisibleInput"
              onChange={(event)=> { 
                console.log("uploaded image: " + document.getElementById("fileElem").files[0]); 
                onSelect(document.getElementById("fileElem").files[0], "FILE");
                setUploaded(true);
              }
            }/>
        </label>

    </div>
  );
};

export default IconSelect;
