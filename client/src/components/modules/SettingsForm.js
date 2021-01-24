import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
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
  uploadedFile: undefined,
};

/** A bookmark form to be used for handling the creating of a new bookmark
 *
 * @param onSubmit callback functions that handles the creation of a new bookmark on the home screen on submit
 * @param closeForm callback functions that handles closing the bookmark form
 * @returns {JSX.Element} A bookmark form that has options for URLs, name, and icons
 * @constructor
 */
const SettingsForm = ({ onSubmit, closeForm, googleClientId, handleLogout, uploadBookmarks}) => {
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
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };


  return (
    <Form size="big" inverted style={{ backgroundColor: "rgb(39, 39, 39) !important" }}>
      <div style={{ textAlign: "center" }}>
        <Header as="h1" inverted color="grey">
          Settings
        </Header>
      </div>


      <div style={{ textAlign: "center" }}>
        <GoogleLogout
          clientId={googleClientId}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <Form.Field>
          <label style={{ padding: "5% 0 1% 0" }}>Select Icon</label>
          {/*<IconSelect*/}
          {/*  onSelect={({ icon, isUpload }) => {*/}
          {/*    if (!isUpload) {*/}
          {/*      console.log("set to use icon");*/}
          {/*      setState({ ...state, selectedIcon: icon, selectedCustomIcon: null });*/}
          {/*    } else {*/}
          {/*      console.log("set to use file");*/}
          {/*      setState({ ...state, selectedIcon: null, selectedCustomIcon: icon });*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  defaultIconURL={state.defaultIconURL}*/}
          {/*/>*/}
        </Form.Field>
      </div>
      <label
        onClick={() => {
          console.log("clicked on default");
          console.log(document.getElementById("htmlFile").files[0]);
        }}
      >
        Uploaded: {(state.uploadedFile) && state.uploadedFile.name}
        <img
          src={
            fileUpload
          }
          className="IconSelect-fileUploadImage"
        />
        <input
          type="file"
          id="htmlFile"
          accept=".html"
          className="IconSelect-invisibleInput"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setState({...state, uploadedFile: event.target.files[0]});
          }}
        />
      </label>
      <div style={{ textAlign: "center", padding: "5%" }}>
        <Form.Button
          inverted
          primary
          size="huge"
          type="button"
          onClick={() => uploadBookmarks(state.uploadedFile)}
        >
          Upload!
        </Form.Button>
      </div>
    </Form>
  );
};

export default SettingsForm;