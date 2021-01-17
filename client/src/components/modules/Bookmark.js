import React, {useRef, useEffect} from "react";
import "./Bookmark.css"
import { Button } from 'semantic-ui-react';

const Bookmark = ({ 
    userId, 
    inEditMode, 
    url,
    name,
    location,
    }) => {

    useEffect(() => {
        watchBookmark();
    }, [inEditMode]); 

    // Draws a board to the canvas
    const watchBookmark = () => {
       
    }

    return (
        <div>
            <button href={url} target="_blank"><img src={`https://www.google.com/s2/favicons?domain=${(url) && url.replace('https://www.','')}`} alt="my image" /></button>
            {/* <Button color="google plus" icon="instagram" href={url} target="_blank"></Button> */}
            <div>
                {name}
            </div>
        </div>
        
    );
}

export default Bookmark;
