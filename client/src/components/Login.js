import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { Button, TextField, Typography } from "@material-ui/core";

export default function Login({ onIdSubmit }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onIdSubmit(inputValue);
  }

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <Container
      className=" myForm d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <Typography variant="h3" className="mb-4">SwiftChat</Typography>

      <Form onSubmit={handleSubmit} className="w-100">
        <TextField
          id="outlined-basic"
          label="Enter your ID"
          variant="outlined"
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          required
          className="w-100 mb-4"
          helperText="Enter or create a unique ID to start messaging."
          size="small"
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            disableElevation
            type="submit"
          >
            Submit
          </Button>
          <Button variant="contained" disableElevation onClick={createNewId}>
            Create a new ID
          </Button>
        </div>
      </Form>
    </Container>
  );
}
