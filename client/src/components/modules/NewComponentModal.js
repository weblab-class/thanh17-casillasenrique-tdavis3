import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Icon } from "semantic-ui-react";
import peepo from "../../public/images/peepoHappy.png";

import "./NewComponentModal.css";

/** A modal component that takes in a specific form for a new group, bookmark, etc. and turn it into a modal
 *
 * @param isOpen boolean indicating whether the modal is open
 * @param form the specific form that is used for the modal (i.e. newGroup, newBookmark, etc.)
 * @param close properties passed through that is a function to close the modal
 * @returns {JSX.Element}
 * @constructor
 */
const NewComponentModal = ({ isOpen, form, close, isDarkMode }) => {
  //const [open, setOpen] = useState(false);

  // const formWithProps = React.Children.map(form.children, child => {

  //   // checking isValidElement is the safe way and avoids a typescript error too
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, { closeForm: setOpen(false) });
  //   }
  //   return child;
  // });

  return (
    <Modal
      closeIcon
      dimmer="blurring"
      onClose={() => close()}
      onOpen={() => setOpen(true)}
      open={isOpen}
      className={"NewComponentModal ui modal" + (!isDarkMode ? " light" : "")}
      size={"mini"}
    >
      <Modal.Content className={"NewComponentModal modal" + (!isDarkMode ? " light" : "")}>
        {React.cloneElement(form, { closeForm: close, isDarkMode: isDarkMode })}
      </Modal.Content>
    </Modal>
  );
};

export default NewComponentModal;
