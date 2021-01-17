import React, { useState } from "react";
import { Form, Icon, Menu } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_NAME = "Group69";

const NewGroupForm = ({ onSubmit, closeForm }) => {

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
        <label style={{textAlign: "center"}}>Group Name</label>
        <input
          placeholder={PLACEHOLDER_NAME}
          name="groupName"
          onChange={handleChange}
          value={state.bookmarkName}
        />
      </Form.Field>
      <div style={{textAlign: "center"}}>
      <Form.Button
        inverted
        primary
        size="huge"
        type="button"
        onClick={handleSubmit}
        disabled={state.url === "" || state.bookmarkName === ""}
      >
        Create Group
      </Form.Button>
      </div>
    </Form>
  );
};

export default NewGroupForm;
