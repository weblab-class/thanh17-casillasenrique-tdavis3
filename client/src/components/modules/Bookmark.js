import React, {useRef, useEffect} from "react";
import "./Bookmark.css"
import { Button } from 'semantic-ui-react';

const FAVICON_URL="https://www.google.com/s2/favicons?domain=";

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
            <form action={url} target="_blank">
                <button type="submit" >
                    
                    <img src={FAVICON_URL + ((url) && url.replace('https://www.',''))}/>
                </button>
            </form>
            {/* <Button color="google plus" icon="instagram" href={url} target="_blank"></Button> */}
            <div>
                {name}
            </div>
        </div>   
    );
}

export default Bookmark;
