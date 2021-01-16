import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Icon } from "semantic-ui-react";
import peepo from "../../public/images/peepoHappy.png"

import "./NewComponentModal.css";
const NewComponentModal = ({ isOpen, form, close }) => {
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
        dimmer='blurring'
        onClose={() =>  close()}
        onOpen={() => setOpen(true)}
        open={isOpen}
        
    >
      <Modal.Header className="NewComponentModal modal">Create New Bookmark</Modal.Header>
      <Modal.Content className="NewComponentModal modal">
        {React.cloneElement(form, { closeForm: close })}
        {}
      </Modal.Content >
    </Modal>
  );
};

export default NewComponentModal;
