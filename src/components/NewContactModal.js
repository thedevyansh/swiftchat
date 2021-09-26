import { useState } from "react";
import { Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";

export default function NewContactModal({ closeModal }) {
  const { createContact } = useContacts();
  const [idValue, setIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    createContact(idValue, nameValue);
    closeModal();
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Create a new contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add new contacts to start messaging them. You can send them message
          personally or in groups.
        </DialogContentText>

        <Form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            onChange={(e) => setIdValue(e.target.value)}
            required
          />

          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setNameValue(e.target.value)}
            required
          />

          <DialogActions>
            <Button color="primary" type="submit">
              Create contact
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </>
  );
}
