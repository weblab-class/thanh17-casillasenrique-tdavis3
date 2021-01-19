import React, { useRef, useEffect } from "react";
import "./Bookmark.css";
import "../../utilities.css";
import { Button } from "semantic-ui-react";

const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";

/** A bookmark object that takes in urls and all properties that exist for a bookmark and render
 * it
 *
 * @param userId ID of the Google user
 * @param inEditMode boolean value indicating whether the bookmark is in edit mode or not
 * @param url the url for the specific bookmark
 * @param name the custom name label for the bookmark
 * @param image the image representing the icon of the bookmark
 * @param location the location of the bookmark
 * @returns {JSX.Element}
 * @constructor
 */
const Bookmark = ({ inEditMode, url, name, image, location, onRemove }) => {
  useEffect(() => {
    watchBookmark();
  }, [inEditMode]);

  const watchBookmark = () => {};

  return (
    <>
      <form action={url} target="_blank">
        <button disabled={inEditMode} className="Bookmark-button u-flex-alignCenter" type="submit">
          <img className="Bookmark-image u-flex-alignCenter u-grow" src={image} />
          {/*<div className="Bookmark-text-container u-flex-alignCenter">*/}

          {/*</div>*/}
        </button>
        <p className="Bookmark-text u-bold ">{name}</p>
      </form>
      {(inEditMode) && 
        <Button 
          size="tiny" 
          inverted 
          circular 
          icon="close"
          onClick={onRemove}
        />
      }
    </>
  );
};

export default Bookmark;
