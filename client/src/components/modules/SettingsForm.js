import React, { useState, useRef } from "react";
import { Form, Icon, Menu, Header, Button, Radio } from "semantic-ui-react";
import IconSelect from "./IconSelect";
import standardIcon from "../../public/images/globe.png";
import fileUpload from "../../public/images/fileUpload.png";
import { GoogleLogout } from "react-google-login";
const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";
const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";
const URL_REGEX =
  "((http|https)://)?(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const initialState = {
  bookmarksFile: undefined,
  backgroundFile: undefined,
};

/** A bookmark form to be used for handling the creating of a new bookmark
 *
 * @param onSubmit callback functions that handles the creation of a new bookmark on the home screen on submit
 * @param closeForm callback functions that handles closing the bookmark form
 * @returns {JSX.Element} A bookmark form that has options for URLs, name, and icons
 * @constructor
 */
const SettingsForm = ({ onSubmit, closeForm, googleClientId, handleLogout, uploadBookmarks }) => {
  const [state, setState] = useState(initialState);
  const bookmarksInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  /** Submits the form to make a new bookmark
   *
   */
  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };

  return (
    <Form size="big" inverted style={{ backgroundColor: "rgb(39, 39, 39) !important" }}>
      <Header as="h2" inverted color="grey">
        Settings
      </Header>

      <label>Upload Bookmarks</label>
      <Form.Group inline>
        <Form.Field>
          <Button
            icon
            labelPosition="right"
            inverted
            onClick={() => {
              console.log("clicked on default");
              bookmarksInputRef.current.click();
            }}
          >
            Choose File
            <input
              type="file"
              hidden
              id="htmlFile"
              accept=".html"
              className="IconSelect-invisibleInput"
              ref={bookmarksInputRef}
              onChange={(event) => {
                console.log(event.target.files[0]);
                setState({ ...state, bookmarksFile: event.target.files[0] });
              }}
            />
            <Icon name="upload"></Icon>
          </Button>
        </Form.Field>
        <Form.Field>
          <Form.Button size="mini" circular inverted icon="question"></Form.Button>
        </Form.Field>
      </Form.Group>
      <p
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {state.bookmarksFile && state.bookmarksFile.name}
      </p>

      <label>Change Background </label>
      <Form.Group inline>
        <Form.Field>
          <Button
            icon
            labelPosition="right"
            inverted
            onClick={() => {
              console.log("clicked on default");
              backgroundInputRef.current.click();
            }}
          >
            Choose File
            <input
              type="file"
              hidden
              id="imgFile"
              accept="image/*"
              className="IconSelect-invisibleInput"
              ref={backgroundInputRef}
              onChange={(event) => {
                console.log(event.target.files[0]);
                setState({ ...state, backgroundFile: event.target.files[0] });
              }}
            />
            <Icon name="upload"></Icon>
          </Button>
        </Form.Field>
        <Form.Field>
          <Form.Button size="mini" circular inverted icon="question"></Form.Button>
        </Form.Field>
      </Form.Group>
      <p
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {state.backgroundFile && state.backgroundFile.name}
      </p>

      <label>Change Theme</label>
      <Form.Group inline>
        <Form.Field>
          <Radio toggle onChange={() => console.log("toggled")} />
        </Form.Field>
        <p style={{ fontSize: "small", color: "rgb(200,200,200)" }}>Dark mode</p>
      </Form.Group>

      <Form.Button
        inverted
        primary
        size="large"
        type="button"
        onClick={() => uploadBookmarks(state.bookmarksFile)}
      >
        Save Changes
      </Form.Button>
    </Form>
  );
};

export default SettingsForm;
