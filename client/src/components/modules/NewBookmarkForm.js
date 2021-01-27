import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
import IconSelect from "./IconSelect";
import standardIcon_light from "../../public/images/globe_light.png";

const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";
const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";
const URL_REGEX =
  "((http|https)://)?(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const initialState = {
  url: "",
  bookmarkName: "",
  selectedIcon: standardIcon_light,
  selectedCustomIcon: undefined,
  defaultIconURL: undefined,
};

/** A bookmark form to be used for handling the creating of a new bookmark
 *
 * @param onSubmit callback functions that handles the creation of a new bookmark on the home screen on submit
 * @param closeForm callback functions that handles closing the bookmark form
 * @returns {JSX.Element} A bookmark form that has options for URLs, name, and icons
 * @constructor
 */
const NewBookmarkForm = ({ onSubmit, closeForm, isDarkMode }) => {
  const [state, setState] = useState(initialState);

  /** Handle the changes that occur while interacting with the new bookmark form
   *
   * @param event The specific event defined with a name indicating what change has occurred
   * when interacting with the form and the specific value indicating the updated states
   * to be made
   */
  const handleChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    let location = undefined;
    if (targetName === "url") {
      if (targetValue.match(URL_REGEX)) {
        location = FAVICON_URL + targetValue;
      }

      setState({ ...state, defaultIconURL: location, url: targetValue });
    } else {
      setState({ ...state, [targetName]: targetValue });
    }
  };

  /** Submits the form to make a new bookmark
   *
   */
  const handleSubmit = () => {
    console.log(state);
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };

  return (
    <Form
      size="big"
      inverted={isDarkMode}
      //style={{backgroundColor: "rgb(39, 39, 39) !important"}}
    >
      <div style={{ textAlign: "center" }}>
        <Header as="h1" inverted={isDarkMode} color="grey">
          Add a Bookmark
        </Header>
      </div>

      <div style={{ textAlign: "center" }}>
        <Form.Field>
          <label style={{ padding: "5% 0 1% 0" }}>URL</label>
          <input
            placeholder={PLACEHOLDER_URL}
            name="url"
            onChange={handleChange}
            value={state.url}
          />
        </Form.Field>
      </div>

      <div style={{ textAlign: "center" }}>
        <Form.Field>
          <label style={{ padding: "5% 0 1% 0" }}>Bookmark Name</label>
          <input
            placeholder={PLACEHOLDER_NAME}
            name="bookmarkName"
            onChange={handleChange}
            value={state.bookmarkName}
          />
        </Form.Field>
      </div>

      <div style={{ textAlign: "center" }}>
        <Form.Field>
          <label style={{ padding: "5% 0 1% 0" }}>Select Icon</label>
          <IconSelect
            onSelect={({ icon, isUpload }) => {
              if (!isUpload) {
                setState({ ...state, selectedIcon: icon, selectedCustomIcon: null });
              } else {
                setState({ ...state, selectedIcon: null, selectedCustomIcon: icon });
              }
            }}
            defaultIconURL={state.defaultIconURL}
            isDarkMode={isDarkMode}
            onError={(isDefault) => {
              if (isDefault) {
                setState({ ...state, selectedIcon: standardIcon_light, selectedCustomIcon: null, defaultIconURL: null });
              } else {
                setState({ ...state, defaultIconURL: null });
              }
            }}
          />
        </Form.Field>
      </div>

      <div style={{ textAlign: "center", padding: "5%" }}>
        <Form.Button
          inverted={isDarkMode}
          primary
          size="huge"
          type="button"
          // color= "#1F2322"
          onClick={handleSubmit}
          disabled={state.url === "" || state.bookmarkName === "" || !state.url.match(URL_REGEX)}
        >
          Create Bookmark
        </Form.Button>
      </div>
    </Form>
  );
};

export default NewBookmarkForm;
