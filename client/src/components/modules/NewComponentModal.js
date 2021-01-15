import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Icon } from "semantic-ui-react";

const NewComponentModal = ({ trigger, form }) => {
    const [open, setOpen] = useState(false);
    
    // const formWithProps = React.Children.map(form.children, child => {
      
    //   // checking isValidElement is the safe way and avoids a typescript error too
    //   if (React.isValidElement(child)) {
    //     return React.cloneElement(child, { closeForm: setOpen(false) });
    //   }
    //   return child;
    // });

    const close = () => {
      setOpen(false);
    }

    // useEffect(() => {
    //   const formWithCloseFunction = React.cloneElement(form, { closeForm: close});
    //   console.log(form.props);
    //   console.log(formWithCloseFunction);
    // });
    

    return (
    <Modal
        closeIcon
        dimmer='blurring'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
    >
      <Modal.Header>Create New Bookmark</Modal.Header>
      <Modal.Content>
        {React.cloneElement(form, { closeForm: close })}
        {}
      </Modal.Content>
    </Modal>
  );
};

export default NewComponentModal;
