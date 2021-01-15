

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
const ModalExampleModal = (
    // bookmarks
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
        {/*<Image*/}
        {/*  size="medium"*/}
        {/*  src="https://react.semantic-ui.com/images/avatar/large/rachel.png"*/}
        {/*  wrapped*/}
        {/*/>*/}
        {/*//TODO: get the whole bookmark list*/}
        {/*<Modal.Description>*/}
        {/*  <Header>Default Profile Image</Header>*/}
        {/*  <p>*/}
        {/*    We've found the following gravatar image associated with your e-mail*/}
        {/*    address. sdfsdfs dsd f*/}
        {/*  </p>*/}
        {/*  <p>Is it okay to use this photo?</p>*/}
        {/*</Modal.Description>*/}
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

export default ModalExampleModal;
