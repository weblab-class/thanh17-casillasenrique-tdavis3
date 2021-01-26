import React, { useState } from "react";
import { Form, Icon, Menu, Header, HeaderContent } from "semantic-ui-react";
import { GoogleLogout } from "react-google-login";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
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
const UserForm = ({ onSubmit, closeForm, userName, googleClientId, handleLogout, isDarkMode }) => {
  const [state, setState] = useState(initialState);

  /** Handle the changes that occur while interacting with the new bookmark form
   *
   * @param event The specific event defined with a name indicating what change has occurred
   * when interacting with the form and the specific value indicating the updated states
   * to be made
   */


  /** Submits the form to make a new bookmark
   *
   */
  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };

  return (
    <Form size="mini" inverted={isDarkMode} 
    //style={{ backgroundColor: "rgb(39, 39, 39) !important" }}
    >
      <Header as="h1" inverted={isDarkMode} color="grey" style={{textAlign: "center", paddingBottom: "5%"}}>
        Hi, {userName && userName.split(' ')[0]}
      </Header>
      <div style={{ textAlign: "center" }}>
        <GoogleLogout
          clientId={googleClientId}
          buttonText="Sign out of Google"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      </div>

    </Form>
  );
};

export default UserForm;