import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_NAME = "Group69";

const NewGroupForm = ({ onSubmit, closeForm }) => {

  const [state, setState] = useState({
    groupName: "",
  });

  const handleChange = (event) => {
    setState({ groupName: event.target.value })
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState({
      groupName: "",
    });
  };

  return (
    <Form size="huge" inverted>
      <div style = {{textAlign: "center"}}>
        <Header as='h1' inverted color="grey">Add New Group!</Header>
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
        inverted
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
