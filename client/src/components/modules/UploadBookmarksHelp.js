import React, { useState, useRef, useEffect } from "react";
import { Form, Icon, Menu, Modal, Segment, Image } from "semantic-ui-react";
import step1Image from "../../public/images/google_settings.png";
import step2Image from "../../public/images/bookmarks_manager.png";
import step3Image from "../../public/images/upload_file.png";

const Content1 = (
  <>
    <p>
      On Chrome, open the <i>Bookmarks Manager</i> found in the browser options
    </p>
    <p>Ctrl+Shift+O (in Windows/Chrome OS) or Command+Shift+O (in macOS)</p>
    <Image src={step1Image} fluid />
  </>
);
const Content2 = (
  <>
    <p>
      In the bookmarks manager, <i>export</i> your bookmarks by opening the options menu in the top
      right
    </p>
    <p>
      A <i>Chrome HTML Document (.html)</i> file will be downloaded
    </p>
    <Image src={step2Image} fluid />
  </>
);
const Content3 = (
  <>
    <p>Upload your bookmarks file to MarcX and save your changes!</p>
    <Image src={step3Image} fluid />
  </>
);

const step = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
};

const getStepContent = (step) => {
  let content = undefined;
  switch (step) {
    case 1:
      content = Content1;
      break;
    case 2:
      content = Content2;
      break;
    case 3:
      content = Content3;
      break;
    default:
      console.log(step);
      console.log("should never get here");
  }

  return content;
};

const UploadBookmarksHelp = ({ onClose, open, isDarkMode }) => {
  const [state, setState] = useState({
    currentStep: step.STEP_1,
  });

  return (
    <Modal
      closeIcon
      dimmer="blurring"
      className={"NewComponentModal ui modal" + (!isDarkMode ? " light" : "")}
      onClose={onClose}
      open={open}
    >
      <Modal.Header className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")} content="How to upload bookmarks" />
      <Modal.Content className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")}>
        <Menu widths="3" inverted={isDarkMode} pointing>
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.STEP_1 })}
            name="Open Chrome Bookmarks Manager"
            active={state.currentStep === step.STEP_1}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.STEP_2 })}
            name="Export Bookmarks"
            active={state.currentStep === step.STEP_2}
          />
          <Menu.Item
            onClick={() => setState({ ...state, currentStep: step.STEP_3 })}
            name="Upload to MarcX"
            active={state.currentStep === step.STEP_3}
          />
        </Menu>
        {getStepContent(state.currentStep)}
      </Modal.Content>
    </Modal>
  );
};

export default UploadBookmarksHelp;
