import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_NAME = "Folder 1";

/** A folder form to be used for handling the creating of a new folder
 *
 * @param onSubmit callback functions that handles the creation of a new folder on the home screen on submit
 * @param closeForm callback functions that handles closing the folder form
 * @returns {JSX.Element} A folder form that has options for name
 * @constructor
 */
const NewFolderForm = ({ onSubmit, closeForm }) => {

  const [state, setState] = useState({
    folderName: "",
  });

  /** Handle the changes that occur while interacting with the new folder form
   *
   * @param event The event is when the name of the folder changes
   */
  const handleChange = (event) => {
    setState({ folderName: event.target.value })
  };

  /** Submits the form to make a new folder
   *
   */
  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState({
      folderName: "",
    });
  };

  return (
    <Form size="huge" inverted>
      <div style = {{textAlign: "center"}}>
        <Header as='h1' inverted color="grey">Add New Folder!</Header>
      </div>
      <Form.Field>
        <label style={{textAlign: "center", padding: "5% 0 1% 0"}}>Folder Name</label>
        <input
          placeholder={PLACEHOLDER_NAME}
          name="folderName"
          onChange={handleChange}
          value={state.folderName}
        />
      </Form.Field>
      <div style={{textAlign: "center", padding: "5%"}}>
        <Form.Button
          inverted
          primary
          size="huge"
          type="button"
          onClick={handleSubmit}
          disabled={state.folderName === ""}
        >
          Create Folder
        </Form.Button>
      </div>
    </Form>
  );
};

export default NewFolderForm;
