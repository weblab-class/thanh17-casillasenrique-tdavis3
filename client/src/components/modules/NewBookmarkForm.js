import React, { useState } from "react";
import { Form, Icon, Menu } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";
const FAVICON_URL="https://www.google.com/s2/favicons?sz=256&domain_url=";
const URL_REGEX = "((http|https)://)(www.)?" 
  + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" 
  + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const initialState = {
  url: "",
  bookmarkName: "",
  icon: "",
  defaultIconURL: undefined,
}

const NewBookmarkForm = ({ onSubmit, closeForm }) => {

  const [state, setState] = useState(initialState);

  const handleChange = (event) => { 
    const targetName = event.target.name;
    const targetValue = event.target.value;
    
    if(targetName === "url") {
      let location = undefined;
      if (targetValue.match(URL_REGEX)) {
        console.log(targetValue.replace('https://www.',''));
        location = FAVICON_URL + targetValue.replace('https://www.','');
        console.log("setting default icon url to " + location);
        
      }
      setState({...state, defaultIconURL: location, url: targetValue});
    } else {
      setState({ ...state, [targetName]: targetValue })
      console.log(state);
    }
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };


  
  return (
    <Form size="huge" inverted style={{backgroundColor: "rgb(39, 39, 39) !important"}}>
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
          defaultIcon={state.defaultIconURL}
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
