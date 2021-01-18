import React, { useState } from "react";
import { Form, Icon, Menu, Header } from "semantic-ui-react";
import IconSelect from "./IconSelect";
const PLACEHOLDER_URL = "https://www.google.com/";
const PLACEHOLDER_NAME = "Google";
const FAVICON_URL = "https://www.google.com/s2/favicons?sz=256&domain_url=";
const URL_REGEX =
  "((http|https)://)(www.)?" +
  "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
  "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const initialState = {
  url: "",
  bookmarkName: "",
  icon: "",
  defaultIconURL: undefined,
};

const NewBookmarkForm = ({ onSubmit, closeForm }) => {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    if (targetName === "url") {
      let location = undefined;
      if (targetValue.match(URL_REGEX)) {
        console.log(targetValue.replace("https://www.", ""));
        location = FAVICON_URL + targetValue.replace("https://www.", "");
        console.log("setting default icon url to " + location);
      }
      setState({ ...state, defaultIconURL: location, url: targetValue });
    } else {
      setState({ ...state, [targetName]: targetValue });
    }
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(state);
    closeForm();
    setState(initialState);
  };

  return (
    <Form size="big" inverted style={{ backgroundColor: "rgb(39, 39, 39) !important" }}>
      <div style={{ textAlign: "center" }}>
        <Header as="h1" inverted color="grey">
          Add a Bookmark!
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
            onSelect={(iconSelection) => {
              console.log("in new bookmark form" + iconSelection);
              setState({ ...state, icon: iconSelection });
            }}
            defaultIcon={state.defaultIconURL}
          />
        </Form.Field>
      </div>

      <div style={{ textAlign: "center", padding: "5%" }}>
        <Form.Button
          inverted
          primary
          size="huge"
          type="button"
          // color= "#1F2322"
          onClick={handleSubmit}
          disabled={state.url === "" || state.bookmarkName === ""}
        >
          Create Bookmark
        </Form.Button>
      </div>
    </Form>
  );
};

export default NewBookmarkForm;
