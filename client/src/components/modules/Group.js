

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
      closeIcon
      size = 'small'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      trigger={<Button>Show Modal</Button>}
      centered
    >
      {/* <Modal.Header>Should probably have a title somewhere</Modal.Header> */}
      <Modal.Content>
            {/*//TODO: make grid to expand to the whole thing*/}
        {/*TODO: make grid into only 9. Expand to next page. Tricky*/}
        <Grid columns={3} className={"group-container"}>
          <Grid.Row>
            {bookmarks.map((bookmark) => {
              return <Grid.Column> <Bookmark
                userId={userId}
                inEditMode={inEditMode}
                url={bookmark.url}
                name={bookmark.name}
                location={undefined}
              /></Grid.Column>
            })}
          </Grid.Row>

        </Grid>
      </Modal.Content>
      {/*//TODO: add Title @bottom*/}

    </Modal>
  );
}

export default Group;
