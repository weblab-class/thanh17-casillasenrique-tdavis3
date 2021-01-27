import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_NAME = "Group 1";

/** A bookmark form to be used for handling the creating of a new group
 *
 * @param onSubmit callback functions that handles the creation of a new group on the home screen on submit
 * @param closeForm callback functions that handles closing the group form
 * @returns {JSX.Element} A group form that has options for name
 * @constructor
 */
const NewGroupForm = ({ onSubmit, closeForm, isDarkMode }) => {

  const [state, setState] = useState({
    groupName: "",
  });

  /** Handle the changes that occur while interacting with the new group form
   *
   * @param event The event is when the name of the group changes
   */
  const handleChange = (event) => {
    setState({ groupName: event.target.value })
  };

  /** Submits the form to make a new group
   *
   */
  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState({
      groupName: "",
    });
  };

  return (
    <Form size="huge" inverted={isDarkMode}>
      <div style = {{textAlign: "center"}}>
        <Header as='h1' inverted={isDarkMode} color="grey">Add New Group</Header>
      </div>
      <Form.Field>
        <label style={{textAlign: "center", padding: "5% 0 1% 0"}}>Group Name</label>
        <input
          placeholder={PLACEHOLDER_NAME}
          name="groupName"
          onChange={handleChange}
          value={state.groupName}
        />
      </Form.Field>
      <div style={{textAlign: "center", padding: "5%"}}>
      <Form.Button
        inverted={isDarkMode}
        primary
        size="huge"
        type="button"
        onClick={handleSubmit}
        disabled={state.groupName === ""}
      >
        Create Group
      </Form.Button>
      </div>
    </Form>
  );
};

export default NewGroupForm;
