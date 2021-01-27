import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Icon,
  Header,
  Button,
  Radio,
  Modal,
} from "semantic-ui-react";
import UploadBookmarksHelp from "./UploadBookmarksHelp";
import UploadBackgroundHelp from "./UploadBackgroundHelp";


/** A bookmark form to be used for handling the creating of a new bookmark
 *
 * @param onSubmit callback functions that handles the creation of a new bookmark on the home screen on submit
 * @param closeForm callback functions that handles closing the bookmark form
 * @returns {JSX.Element} A bookmark form that has options for URLs, name, and icons
 * @constructor
 */
const FirstLoginDialogue = ({ onClose, open, handleSubmitDialogue, closeForm, isDarkMode }) => {
  const [state, setState] = useState({
    bookmarksFile: undefined,
    backgroundFile: undefined,
    darkModeToggle: true,
    uploadBookmarksHelpToggle: false,
    uploadBackgroundHelpToggle: false,
  });

  const bookmarksInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  // useEffect(() => {
  //   setState({ ...state, darkModeToggle: isDarkMode})
  // }, []);

  /** Submits the form to make a new bookmark
   *
   */
  const handleSubmit = () => {
    closeForm();
    handleSubmitDialogue(state.backgroundFile, state.bookmarksFile, state.darkModeToggle);
  };

  return (
    <>
      <UploadBookmarksHelp
        onClose={() => setState({ ...state, uploadBookmarksHelpToggle: false })}
        open={state.uploadBookmarksHelpToggle}
        isDarkMode={state.darkModeToggle}
      />

      <UploadBackgroundHelp
        onClose={() => setState({ ...state, uploadBackgroundHelpToggle: false })}
        open={state.uploadBackgroundHelpToggle}
        isDarkMode={state.darkModeToggle}
      />

      <Modal dimmer="blurring" className={"NewComponentModal ui modal" + (!state.darkModeToggle ? " light" : "")} open={open}>
        <Modal.Content className={"NewComponentModal modal" + (!state.darkModeToggle ? " light" : "")} >
          <Form
            size="big"
            inverted={state.darkModeToggle}
            //style={{ backgroundColor: "rgb(39, 39, 39) !important" }}
          >
            <Header as="h2" inverted={state.darkModeToggle} color="grey">
              Welcome to MarcX!
            </Header>

            <label>Would you like to upload any bookmarks?</label>
            <Form.Group inline>
              <Form.Field>
                <Button.Group>
                  <Button primary={(state.bookmarksFile) ? false: true} inverted={state.darkModeToggle}>
                    No thanks!
                  </Button>
                  <Button.Or />
                  <Button
                    icon
                    primary={(state.bookmarksFile) ? true : false}
                    labelPosition="right"
                    inverted={state.darkModeToggle}
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
                        //console.log(event.target.files[0]);
                        if (event.target.files[0]) {
                          setState({ ...state, bookmarksFile: event.target.files[0] });
                        } else {
                          setState({ ...state, bookmarksFile: null });
                        }
                      }}
                    />
                    <Icon name="upload"></Icon>
                  </Button>
                </Button.Group>
              </Form.Field>
              <Form.Field>
                <Form.Button
                  size="mini"
                  circular
                  inverted={state.darkModeToggle}
                  icon="question"
                  onClick={() => setState({ ...state, uploadBookmarksHelpToggle: true })}
                ></Form.Button>
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

            <label>Would you like to upload a custom background? </label>
            <Form.Group inline>
              <Form.Field>
                <Button.Group>
                  <Button primary={!state.backgroundFile} inverted={state.darkModeToggle}>
                    No thanks!
                  </Button>
                  <Button.Or />
                  <Button
                    icon
                    labelPosition="right"
                    inverted={state.darkModeToggle}
                    primary={state.backgroundFile}
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
                        if (event.target.files[0]) {
                          setState({ ...state, backgroundFile: event.target.files[0] });
                        } else {
                          setState({ ...state, backgroundFile: null });
                        }
                      }}
                    />
                    <Icon name="upload"></Icon>
                  </Button>
                </Button.Group>
              </Form.Field>
              <Form.Field>
                <Form.Button
                  onClick={() => setState({ ...state, uploadBackgroundHelpToggle: true })}
                  size="mini"
                  circular
                  inverted={state.darkModeToggle}
                  icon="question"
                ></Form.Button>
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

            <label>Choose your theme</label>
            <Form.Group inline>
              <Form.Field>
                <Radio
                  toggle
                  onChange={() => setState({ ...state, darkModeToggle: !state.darkModeToggle })}
                  checked={state.darkModeToggle}
                />
              </Form.Field>
              <p style={{ fontSize: "small", color: state.darkModeToggle ? "rgb(200,200,200)" : "rgb(75, 75, 75)" }}>
                {state.darkModeToggle ? "Dark mode" : "Light mode"}
              </p>
            </Form.Group>

            <Form.Button inverted={state.darkModeToggle} primary size="large" type="button" onClick={handleSubmit}>
              Create my home page!
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FirstLoginDialogue;
