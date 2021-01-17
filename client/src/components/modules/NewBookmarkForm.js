import React, { useState } from "react";
import { Form, Icon, Menu } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";

const NewBookmarkForm = ({ onSubmit, closeForm }) => {

  const [state, setState] = useState({
    url: "",
    bookmarkName: "",
    icon: "",
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
    <Form size="huge" inverted>
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
      <Form.Field>
        <label>Select Icon</label>
        <IconSelect 
          onSelect={(iconSelection) => {
            setState({...state, icon: iconSelection});
          }}
          defaultIcon={null}
        />
      </Form.Field>
      <Form.Button 
        inverted
        primary
        size="huge"
        type="button"
        onClick={handleSubmit}
        disabled={state.url === "" || state.bookmarkName === ""}
      >
        Create Bookmark
      </Form.Button>
    </Form>
  );
};

export default NewBookmarkForm;
