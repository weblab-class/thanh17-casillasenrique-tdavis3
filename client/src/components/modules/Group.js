

//TODO: install semantic UI
//

import React, { Component } from "react";
import "./Group.css";
import { Button, Header, Image, Modal, Icon, Grid } from "semantic-ui-react";
import Bookmark from "./Bookmark";
import CollapsedGroup from "./CollapsedGroup";
// class Group extends Component {
//   constructor(props) {
//     super(props);
//   }
const Group = (
  {
    bookmarks,
    inEditMode,
    userId
  }
) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      // closeIcon
      className="Group modal"
      size = 'small'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      //trigger={<Button size={"big"}>Show Modal</Button>}
      trigger={<CollapsedGroup name="Test Group" bookmarkIcons={bookmarks.map((bookmark) => bookmark.image)} onClick={() => setOpen(true)}/>}
      centered
    >
      {/*<Modal.Header>Should probably have a title somewhere</Modal.Header>*/}
      {/*<Modal.Content>*/}
        {/*TODO: Make into groups expansions*/}
        {/*TODO: make grid Expand to next page. Filter via passing in page number then map via passing in a page*/}
        <div className="Group grid">
            {bookmarks.map((bookmark) => {
              return  <Bookmark
                userId={userId}
                inEditMode={inEditMode}
                url={bookmark.url}
                name={bookmark.name}
                location={undefined}
              />
            })}

        </div>
      {/*</Modal.Content>*/}
      {/*//TODO: add Title @bottom*/}

    </Modal>
  );
}

export default Group;
