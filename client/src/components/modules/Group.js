//TODO: install semantic UI
//

import React, { Component } from "react";
import "./Group.css";
import { Button, Header, Image, Modal, Icon, Grid } from "semantic-ui-react";
import Bookmark from "./Bookmark";
import CollapsedGroup from "./CollapsedGroup";

/** Creates a group object given all of the properties of the group and its identification
 *
 * @param bookmarks the list of bookmarks for the given group
 * @param inEditMode boolean indicating whether the specific group is in edit mode or not
 * @param userId the Google ID that correspond to the group owner
 * @param name name of the group
 * @returns {JSX.Element}
 * @constructor
 */
const Group = ({ bookmarks, inEditMode, userId, name }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      className="Group modal"
      size="small"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={
        <CollapsedGroup
          name={name}
          bookmarkIcons={bookmarks.map((bookmark) => { return (bookmark.customIcon) ? URL.createObjectURL(bookmark.customIcon) : bookmark.icon})}
          onClick={() => setOpen(true)}
        />
      }
      centered
    >
      {console.log("bookmarks:" + bookmarks)}
      {/*<Modal.Header>Should probably have a title somewhere</Modal.Header>*/}
      {/*<Modal.Content>*/}
      {/*TODO: make grid Expand to next page. Filter via passing in page number then map via passing in a page*/}
      <div className="Group grid">
        {bookmarks.map((bookmark) => {
          return (
            <Bookmark
              key={bookmark._id}
              userId={userId}
              inEditMode={inEditMode}
              url={bookmark.url}
              name={bookmark.name}
              location={undefined}
              icon={bookmark.icon}
              customIcon={bookmark.customIcon}
            />
          );
        })}
      </div>
      {/*</Modal.Content>*/}
      {/*//TODO: add Title @bottom*/}
    </Modal>
  );
};

export default Group;
