import React, { useState } from "react";
import { Button, Modal, Checkbox, Form, Icon } from "semantic-ui-react";

const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";

const NewBookmarkForm = ({ onSubmit, closeForm }) => {

  const [state, setState] = useState({
    url: "",
    bookmarkName: "",
  });

  const handleChange = (event) => { 
    setState({ ...state, [event.target.name]: event.target.value })
    console.log(state);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState({
      url: "",
      bookmarkName: "",
    });
  };

  return (
    <Form inverted>
      <Form.Field>
        <label>URL</label>
        <input 
          placeholder={PLACEHOLDER_URL}
          name="url"
          onChange={handleChange}
          value={state.url}
          />
      </Form.Field>
      <Form.Field>
        <label>Bookmark Name</label>
        <input 
          placeholder={PLACEHOLDER_NAME} 
          name="bookmarkName" 
          onChange={handleChange}
          value={state.bookmarkName} 
        />
      </Form.Field>
      <Button 
        type="button"
        onClick={handleSubmit}
      >
        Create Bookmark
      </Button>
    </Form>
  );
};

export default NewBookmarkForm;
