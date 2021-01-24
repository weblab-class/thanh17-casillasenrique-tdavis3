import React, { useState, useEffect } from "react";
import { Sidebar, Menu, Icon, Header } from "semantic-ui-react";
import newBookmark from "../../public/images/New_Bookmark.png";
import newGroup from "../../public/images/New_Group.png";
import newWidget from "../../public/images/New_Widget.png";
import NewComponentModal from "./NewComponentModal";
import NewBookmarkForm from "./NewBookmarkForm";
import NewGroupForm from "./NewGroupForm";
import SettingsForm from "./SettingsForm";

const HomeSidebar = ({
  visible,
  onHide,
  handleCreateBookmark,
  handleCreateGroup,
  googleClientId,
  handleLogout,
  handleUploadBookmarks,
}) => {
  //State
  const [state, setState] = useState({
    bookmarkModalOpened: false,
    widgetModalOpened: false,
    groupModalOpened: false,
    settingsModalOpened: false,
  });

  return (
    <>
      {/* New Bookmark Form */}
      <NewComponentModal
        isOpen={state.bookmarkModalOpened}
        form={<NewBookmarkForm onSubmit={handleCreateBookmark} />}
        close={() => setState({ ...state, bookmarkModalOpened: false })}
      />

      {/* New Group Form */}
      <NewComponentModal
        isOpen={state.groupModalOpened}
        form={<NewGroupForm onSubmit={handleCreateGroup} />}
        close={() => setState({ ...state, groupModalOpened: false })}
      />

      <NewComponentModal
        isOpen={state.settingsModalOpened}
        form={
          <SettingsForm
            uploadBookmarks={handleUploadBookmarks}
            onSubmit={() => setState({ ...state, settingsModalOpened: false })}
            closeForm={() => console.log("closing form")}
            googleClientId={googleClientId}
            handleLogout={handleLogout}
          />
        }
        close={() => setState({ ...state, settingsModalOpened: false })}
      />

      <Sidebar
        as={Menu}
        direction="right"
        animation="overlay"
        visible={
          visible &&
          !state.bookmarkModalOpened &&
          !state.groupModalOpened &&
          !state.settingsModalOpened
        }
        onHide={onHide}
        inverted
        vertical
        icon="labeled"
      >
        <Menu.Item
          as="a"
          onClick={onHide}
        >
          <Icon name="arrow right"></Icon>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Create Item</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on new bookmark!");
                setState({ ...state, bookmarkModalOpened: true });
              }}
            >
              {/* <img src={newBookmark} /> */}
              <Icon name="bookmark"></Icon>
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on new group!");
                setState({ ...state, groupModalOpened: true });
              }}
            >
              {/* <img src={newGroup} /> */}
              <Icon name="square outline"></Icon>
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on new widget!");
                setState({ ...state, widgetModalOpened: true });
              }}
            >
              {/* <img src={newWidget} /> */}
              
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Settings</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on settings");
                setState({ ...state, settingsModalOpened: true });
              }}
            >
              <Icon name="setting"></Icon>
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on profile");
                setState({ ...state, settingsModalOpened: true });
              }}
            >
              <Icon name="user outline"></Icon>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>
    </>
  );
};

export default HomeSidebar;
