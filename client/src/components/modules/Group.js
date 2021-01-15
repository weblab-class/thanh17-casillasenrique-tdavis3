

//TODO: install semantic UI
//

import React, { Component } from "react";
import "./Group.css";
import { Button, Header, Image, Modal,Icon } from "semantic-ui-react";
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
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Should probably have a title somewhere</Modal.Header>
      <Modal.Content>
            <Bookmark
              userId={"I deez nuts"}
              inEditMode= {false}
              url={"youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO"}
              name={"name deez"}
              location={undefined}
            />
        <div>
          {bookmarks.map((bookmark) => {
            return <Bookmark
              userId={userId}
              inEditMode={inEditMode}
              url={bookmark.url}
              name={bookmark.name}
              location={undefined}
            />
          })}
        </div>
      </Modal.Content>
      {/*<Modal.Footer> Yooo</Modal.Footer>*/}
      {/*//TODO: add Title @bottom*/}
      {/*<Modal.Actions>*/}
      {/*  <Button color="black" onClick={() => setOpen(false)}>*/}
      {/*    Nope*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    content="Yep, that's me"*/}
      {/*    labelPosition="right"*/}
      {/*    icon="checkmark"*/}
      {/*    onClick={() => setOpen(false)}*/}
      {/*    positive*/}
      {/*  />*/}
      {/*</Modal.Actions>*/}
    </Modal>
  );
}

export default Group;
