import React, { useState } from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import NewComponentModal from "./NewComponentModal";
import NewBookmarkForm from "./NewBookmarkForm";
import NewGroupForm from "./NewGroupForm";
import SettingsForm from "./SettingsForm";
import UserForm from "./UserForm";
import HelpModal from "./HelpModal";

const modalKeys = {
  NONE: "none",
  ADD_BOOKMARK: "bookmark",
  ADD_GROUP: "group",
  SETTINGS: "settings",
  PROFILE: "profile",
  HELP: "help",
};

const HomeSidebar = ({
  visible,
  onHide,
  handleCreateBookmark,
  handleCreateGroup,
  googleClientId,
  userName,
  handleLogout,
  handleEditSettings,
  isDarkMode,
}) => {
  //State
  const [state, setState] = useState({
    openedModal: modalKeys.NONE,
  });

  return (
    <>
      {/* New Bookmark Form */}
      <NewComponentModal
        isOpen={state.openedModal === modalKeys.ADD_BOOKMARK}
        form={<NewBookmarkForm onSubmit={handleCreateBookmark} />}
        close={() => setState({ ...state, openedModal: modalKeys.NONE })}
        isDarkMode={isDarkMode}
      />

      {/* New Group Form */}
      <NewComponentModal
        isOpen={state.openedModal === modalKeys.ADD_GROUP}
        form={<NewGroupForm onSubmit={handleCreateGroup} />}
        close={() => setState({ ...state, openedModal: modalKeys.NONE })}
        isDarkMode={isDarkMode}
      />

      <SettingsForm
        isOpen={state.openedModal === modalKeys.SETTINGS}
        closeModal={() => setState({ ...state, openedModal: modalKeys.NONE })}
        handleEditSettings={handleEditSettings}
        onSubmit={() => setState({ ...state, openedModal: modalKeys.NONE })}
        isDarkMode={isDarkMode}
      />

      <HelpModal
        onClose={() => setState({ ...state, openedModal: modalKeys.NONE })}
        open={state.openedModal === modalKeys.HELP}
        isDarkMode={isDarkMode}
      />


      <NewComponentModal
        isOpen={state.openedModal === modalKeys.PROFILE}
        isDarkMode={isDarkMode}
        close={() => setState({ ...state, openedModal: modalKeys.NONE })}
        form={
          <UserForm
            onSubmit={() => setState({ ...state, userModalOpened: false })}
            closeForm={() => console.log("closing form")}
            googleClientId={googleClientId}
            handleLogout={handleLogout}
            userName={userName}
          />
        }
      />

      <Sidebar
        as={Menu}
        direction="right"
        animation="overlay"
        visible={visible && state.openedModal === modalKeys.NONE}
        onHide={onHide}
        inverted={isDarkMode}
        vertical
        icon="labeled"
      >
        <Menu.Item as="a" onClick={onHide}>
          <Icon name="arrow right"></Icon>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Create Item</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on new bookmark!");
                setState({ ...state, openedModal: modalKeys.ADD_BOOKMARK });
              }}
            >
              {/* <img src={newBookmark} /> */}
              <Icon name="bookmark"></Icon>
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on new group!");
                setState({ ...state, openedModal: modalKeys.ADD_GROUP });
              }}
            >
              {/* <img src={newGroup} /> */}
              <Icon name="square outline"></Icon>
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
                setState({ ...state, openedModal: modalKeys.SETTINGS });
              }}
            >
              <Icon name="setting"></Icon>
            </Menu.Item>

            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on profile");
                setState({ ...state, openedModal: modalKeys.PROFILE });
              }}
            >
              <Icon name="user outline"></Icon>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Help</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as="a"
              onClick={() => {
                console.log("clicked on help");
                setState({ ...state, openedModal: modalKeys.HELP});
              }}
            >
              <Icon name="question circle"></Icon>
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>
    </>
  );
};

export default HomeSidebar;
