import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon from "../../public/images/bookmark.png";
import fileUpload from "../../public/images/fileUpload.png";

const defaultIconLoader = <div className="ui active centered inline loader"/>;
 
import "./IconSelect.css";

const IconSelect = ({ onSelect, defaultIcon }) => {

    const [selected, setSelected] = useState("standard");
    const [defaultLoading, setDefaultLoading] = useState(true);

    useEffect(() => {
        if (defaultIcon) {
            setDefaultLoading(false);
        }
    }, [defaultIcon, selected]);

    return (
        <div className="IconSelect-container">
            <div>
            <img 
                className="NewBookmarkForm-Standard" 
                src={fileUpload}
                onClick={() => { 
                    onSelect(standardIcon);
                    setSelected("standard"); 
                }}
                style={(selected === "standard") && {color: "black"}}
            >
            </img>
            </div>
            <div>
            {defaultLoading ? defaultIconLoader : <img className="NewBookmarkForm-Default" src={fileUpload}/>}
            </div>
            <div>
            <img className="NewBookmarkForm-Upload" src={fileUpload}/>
            </div>
        </div>
    );
};

export default IconSelect;