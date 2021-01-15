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
            <Button color="google plus" icon="google" href={"https://www." + url} target="_blank"></Button>
            <div>
                {name}
            </div>
        </div>
        
    );
}

export default Bookmark;
