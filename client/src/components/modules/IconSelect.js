import React, { useState, useEffect } from "react";
import { Loader, Icon, Menu } from "semantic-ui-react";
import standardIcon from "../../public/images/bookmark.png";
import fileUpload from "../../public/images/fileUpload.png";

const defaultIconLoader = <Loader className="ui active centered inline" size="large">Enter a URL</Loader>;
 
import "./IconSelect.css";

const IconSelect = ({ onSelect, defaultIcon }) => {

    const [selected, setSelected] = useState("standard");

    // useEffect(() => {
    //     if (defaultIcon) {
    //         setDefaultLoading(false);
    //     }
    // }, [defaultIcon, selected]);

    return (
        <div className="IconSelect-container">
            <div>
            <img 
                className="NewBookmarkForm-Standard" 
                src={standardIcon}
                onClick={() => { 
                    console.log("clicked on standard");
                    onSelect(standardIcon);
                    setSelected("standard"); 
                }}
                style={(selected === "standard") ? {width: "300px"}  :  {}}
            >
            </img>
            </div>
            <div>
            {!defaultIcon ? defaultIconLoader : 
                <img 
                    className="IconSelect-default" 
                    src={defaultIcon}
                    onClick={()=>{
                        console.log("clicked on default");
                        onSelect(defaultIcon);
                        setSelected("default");
                    }}
                />}
            </div>
            <div>
            <img className="NewBookmarkForm-Upload" src={fileUpload}/>
            </div>
        </div>
    );
};

export default IconSelect;