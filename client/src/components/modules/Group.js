

//TODO: install semantic UI
//

import React, { Component } from "react";
import "./Group.css";
import { Button, Header, Image, Modal, Icon, Grid } from "semantic-ui-react";
import Bookmark from "./Bookmark";
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
      size = 'small'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={<Button>Show Modal</Button>}
      centered
    >
      <Modal.Header>Should probably have a title somewhere</Modal.Header>
      {/*<Modal.Content>*/}
        {/*TODO: Make into groups expansions*/}
        {/*TODO: make grid Expand to next page. State/counter? Tricky*/}
        <div className={"grid"}>
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
