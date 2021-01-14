import React, {useRef, useEffect} from "react";
import { Button } from 'react-bootstrap';
import "./Bookmark.css"

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
            <Button variant="outline-light" className="Bookmark" href={"https://www." + url} target="_blank"></Button>{' '}
            <div>
                {name}
            </div>
        </div>
        
    );
}

export default Bookmark;
