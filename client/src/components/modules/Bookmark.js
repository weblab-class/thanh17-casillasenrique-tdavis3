import React, {useState, useEffect, useRef} from "react";
import "./Bookmark.css";
import "../../utilities.css";
import {Button, Menu, Popup} from "semantic-ui-react";
import globe from "../../public/images/globe.png";

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
const Bookmark = ({inEditMode, url, name, icon, customIcon, location, onRemove}) => {

    const contextRef = useRef()
    const [open, setOpen] = useState(false)
    const [displayedIcon, setDisplayedIcon] = useState(globe);

    useEffect(() => {
        if (customIcon) {
            console.log(customIcon);
            setDisplayedIcon(URL.createObjectURL(customIcon));
        } else {
            setDisplayedIcon(icon);
        }
    });

    useEffect(() => {
        watchBookmark();
    }, [inEditMode]);

    const watchBookmark = () => {
    };

    function createContextFromEvent(e) {
        const left = e.clientX
        const top = e.clientY
        const right = left + 1
        const bottom = top + 1

        return {
            getBoundingClientRect: () => ({
                left,
                top,
                right,
                bottom,

                height: 0,
                width: 0,
            }),
        }
    }

    return (
        <>
            <form action={url} target="_blank">
                <button disabled={inEditMode} className="Bookmark-button u-flex-alignCenter" type="submit"
                        onContextMenu={(e) => {
                            e.preventDefault()
                            contextRef.current = createContextFromEvent(e)
                            setOpen(true)
                        }}>
                    <img className="Bookmark-image u-flex-alignCenter u-grow" src={displayedIcon}/>
                    {/*<div className="Bookmark-text-container u-flex-alignCenter">*/}

                    {/*</div>*/}
                </button>
                <p className="Bookmark-text u-bold ">{name}</p>
            </form>
            <Popup
                basic
                context={contextRef}
                onClose={() => setOpen(false)}
                open={open}
            >
                <Menu
                    items={[
                        { key: 'delete', content: 'Delete', icon: 'remove' },
                    ]}
                    onItemClick={() => {
                        onRemove();
                        setOpen(false);
                    }}
                    secondary
                    vertical
                />
            </Popup>
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
