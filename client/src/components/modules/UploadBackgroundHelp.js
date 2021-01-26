import React, { useState, useRef, useEffect } from "react";
import { Form, Icon, Menu, Modal, Segment, Image } from "semantic-ui-react";
import exampleBackground from "../../public/images/example.png";

const UploadBackgroundHelp = ({ onClose, open, isDarkMode }) => {

  return (
    <Modal
      closeIcon
      dimmer="blurring"
      className={"NewComponentModal ui modal" + (!isDarkMode ? " light" : "")}
      onClose={onClose}
      open={open}
    >
      <Modal.Header className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")} content="Uploading a background image" />
      <Modal.Content className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")}>
        <p>When uploading a background image, try to choose large images and make sure their shape would look best on whatever device you are using</p>
        <p>If you are using a computer, choose the background image as if you were choosing your Desktop background image/wallpaper</p>
        <p>Additionally, take into consideration the theme you are using. A darker background image will fit perfectly with dark mode, while a lighter background image is ideal for light mode</p>
        <p>If your background has too many contrasting colors, it may be difficult to see your bookmarks/groups in both light and dark mode</p>
        <p><i>Recommended image file formats:</i> jpg, png</p>
        <Image
          src={exampleBackground}
          fluid
        />
          
      </Modal.Content>
    </Modal>
  );
};

export default UploadBackgroundHelp;
