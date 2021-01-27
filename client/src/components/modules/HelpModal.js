import React, { useState, useRef, useEffect } from "react";
import { Form, Icon, Menu, Modal, Segment, Image } from "semantic-ui-react";
import options from "../../public/images/Sidebar.png";
import group from "../../public/images/group.png";
import homescreen from "../../public/images/homescreen.png";
import editmode from "../../public/images/editmode.png";
import instantEdit from "../../public/images/sidebySide.png";

const HOME_CONTENT = (
  <>
    <p>
      Use the arrows in the top left to switch between different <i>pages</i>
    </p>
    <p>
      Use the <i>Edit Mode</i> button to toggle edit mode on and off
    </p>
    <p>
      Use the <i>Options</i> button to access other important features, such as adding bookmarks,
      groups, and personalizing your home page!
    </p>
    <Image src={homescreen} fluid />
  </>
);
const GROUP_CONTENT = (
  <>
    <p>
      Click on a <i>group</i> to access even more of your bookmarks
    </p>
    <p>
      Groups also contain <i>pages</i> that you can navigate between using the arrows on the left
      and right of the group
    </p>
    <Image src={group} fluid />
  </>
);
const RIGHT_CLICK_CONTENT = (
  <>
    <p>
      <i>Right click</i> on a bookmark or group at any time to access several options
    </p>
    <p>
      Clicking the <i>delete</i> button will delete your bookmark from the page
    </p>
    <p>
      Move the bookmark/group to a different page by entering the page number in the input field and
      pressing the send button. If the destination page is full, the bookmark will be sent to the
      next available spot in later pages
    </p>
    <p>
      Right click on a bookmark <i>within</i> a group to access an additional option of moving it{" "}
      <i>out</i> of the group. The bookmark will be sent to the first available spot in your home
      pages
    </p>
    <Image src={instantEdit} fluid />
  </>
);

const EDIT_CONTENT = (
  <>
    <p>
      Click the <i>edit</i> button to toggle edit mode
    </p>
    <p>
      In edit mode, you have access to additional edit options apart from the right-click options
    </p>
    <p>
      Clicking the <i>"x"</i> icon will delete your bookmark
    </p>
    <p>
      You can <i>drag and drop</i> bookmarks and groups into any available spot in the current page
      to organize your home page however you want
    </p>
    <p>
      You can also drag and drop bookmarks into groups, and they will automatically be added to that
      group!
    </p>
    <Image src={editmode} fluid />
  </>
);

const OPTIONS_CONTENT = (
  <>
    <p>
      Click the <i>Options</i> sidebar to access more MarcX tools and settings 
    </p>
    <p>
      Create new bookmarks and groups by clicking the menu items under the <i>Create Item</i>{" "}
      submenu. Click these to add custom bookmarks and groups to your home pages!
    </p>
    <p>
      Click the gear icon under the <i>Settings</i> submenu to access general settings. In settings you can
      change your theme, background image, and upload additional bookmarks
    </p>
    <p>
      Click the profile icon under the Settings submenu to access your profile, where you can sign
      out of MarcX
    </p>
    <Image src={options} fluid />
  </>
);

const step = {
  HOME: 1,
  GROUP: 2,
  RIGHT_CLICK: 3,
  EDIT: 4,
  OPTIONS: 5,
};

const getStepContent = (step) => {
  let content = undefined;
  switch (step) {
    case 1:
      content = HOME_CONTENT;
      break;
    case 2:
      content = GROUP_CONTENT;
      break;
    case 3:
      content = RIGHT_CLICK_CONTENT;
      break;
    case 4:
      content = EDIT_CONTENT;
      break;
    case 5:
      content = OPTIONS_CONTENT;
      break;
    default:
      console.log(step);
      console.log("should never get here");
  }

  return content;
};

const HelpModal = ({ onClose, open, isDarkMode }) => {
  const [state, setState] = useState({
    currentStep: step.HOME,
  });

  return (
    <Modal
      closeIcon
      size="large"
      dimmer="blurring"
      className={"NewComponentModal ui modal" + (!isDarkMode ? " light" : "")}
      onClose={onClose}
      open={open}
    >
      <Modal.Header
        className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")}
        content="Help"
      />
      <Modal.Content className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")}>
        <Menu widths="5" inverted={isDarkMode} pointing>
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.HOME })}
            name="Navigating your Home Page"
            active={state.currentStep === step.HOME}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.OPTIONS })}
            name="Navigating Options"
            active={state.currentStep === step.OPTIONS}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.GROUP })}
            name="Navigating Groups"
            active={state.currentStep === step.GROUP}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.RIGHT_CLICK })}
            name="Instant Editing"
            active={state.currentStep === step.RIGHT_CLICK}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.EDIT })}
            name="Edit Mode"
            active={state.currentStep === step.EDIT}
          />
        </Menu>
        {getStepContent(state.currentStep)}
      </Modal.Content>
    </Modal>
  );
};

export default HelpModal;
