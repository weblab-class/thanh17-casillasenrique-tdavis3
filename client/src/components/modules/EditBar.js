import React, { useState } from "react";
import NewBookmarkForm from "../modules/NewBookmarkForm";
import NewComponentModal from "../modules/NewComponentModal";
import closedIcon from "../../public/images/EditDropdownClosed.png";
import openedIcon from "../../public/images/EditDropdownOpened.png";
import newBookmark from "../../public/images/New_Bookmark.png";
import newGroup from "../../public/images/New_Group.png";
import newFolder from "../../public/images/New_Folder.png";
import newWidget from "../../public/images/New_Widget.png";
import NewGroupForm from "../modules/NewGroupForm";
import NewFolderForm from "./NewFolderForm";
import "./EditBar.css";
import "../../utilities.css";

import { Dropdown, Image, Button, Icon  } from "semantic-ui-react";

// const openedImage = <Image className="EditBar-dropdown-button u-grow" src={openedIcon} />;
const openedImage = <div className="EditBar-dropdown-button u-grow"><Icon name={"bars"} inverted={true} size={"large"}/></div>
const closedImage = <div className="EditBar-dropdown-button u-grow"><Icon name={"bars"} inverted={true} size={"large"}/> </div>
// const closedImage = <Image className="EditBar-dropdown-button u-grow" src={closedIcon} />;
const testButton =  <Button circular inverted size="huge" animated="vertical">
                      <Button.Content visible><Icon name="add"/></Button.Content>
                      <Button.Content hidden>New</Button.Content>
                    </Button>;

/**
 *
 * @param handleCreateBookmark callback function that creates a bookmark per the client
 * @param handleCreateGroup callback function that creates a new group per the client
 * @returns {JSX.Element} A Dropdown edit bar that expands to give use options to interact with the elements
 * @constructor
 */
const EditBar = ({ handleCreateBookmark, handleCreateGroup }) => {
  const [trigger, setTrigger] = useState(closedImage);
  const [modalStates, setModalStates] = useState({
    bookmarkModalOpened: false,
    widgetModalOpened: false,
    folderModalOpened: false,
    groupModalOpened: false,
  });

  return (
    <div>
      {/* New Bookmark Form */}
      <NewComponentModal
        isOpen={modalStates.bookmarkModalOpened}
        form={<NewBookmarkForm onSubmit={handleCreateBookmark} />}
        close={() => setModalStates({ ...modalStates, bookmarkModalOpened: false })}
      />

      {/* New Group Form */}
      <NewComponentModal
        isOpen={modalStates.groupModalOpened}
        form={<NewGroupForm onSubmit={handleCreateGroup} />}
        close={() => setModalStates({ ...modalStates, groupModalOpened: false })}
      />

      {/* New Folder Form */}
      {/*<NewComponentModal*/}
      {/*  isOpen={modalStates.folderModalOpened}*/}
      {/*  form={<NewFolderForm onSubmit={handleCreateBookmark} />}*/}
      {/*  close={() => setModalStates({ ...modalStates, folderModalOpened: false })}*/}
      {/*/>*/}

      {/* New Folder Form */}
      <NewComponentModal
        isOpen={modalStates.widgetModalOpened}
        form={<NewBookmarkForm onSubmit={handleCreateBookmark} />}
        close={() => setModalStates({ ...modalStates, widgetModalOpened: false })}
      />

      <Dropdown
        onOpen={() => setTrigger(openedImage)}
        onClose={() => setTrigger(closedImage)}
        floating
        direction="left"
        trigger={trigger}

        // icon={null}
      >
        <Dropdown.Menu className="EditBar ui dropdown menu">
          <Dropdown.Item
            className="EditBar ui dropdown item"
            image={<img className="u-textCenter EditBar image" src={newBookmark} />}
            onClick={() => setModalStates({ ...modalStates, bookmarkModalOpened: true })}
          />

          <>
          </>
          <Dropdown.Item
            className="EditBar ui dropdown item"
            image={<img className="u-textCenter EditBar image" src={newGroup} />}
            onClick={() => setModalStates({ ...modalStates, groupModalOpened: true })}
          />
          {/*<Dropdown.Item*/}
          {/*  className="EditBar ui dropdown item"*/}
          {/*  icon={<img className="u-textCenter EditBar image" src={newFolder} />}*/}
          {/*  onClick={() => setModalStates({ ...modalStates, folderModalOpened: true })}*/}
          {/*/>*/}
          {/*<Dropdown.Item*/}
          {/*  className="EditBar ui dropdown item"*/}
          {/*  icon={<img className="u-textCenter EditBar image" src={newWidget} />}*/}
          {/*  onClick={() => setModalStates({ ...modalStates, widgetModalOpened: true })}*/}
          {/*/>*/}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default EditBar;
