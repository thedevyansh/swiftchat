import { useState } from "react";
import { Form } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedContactIds.length !== 0) createConversation(selectedContactIds);
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <DialogTitle id="form-dialog-title">Create a new conversation</DialogTitle>

      <DialogContent>
        {contacts.length === 0 ? (
          <DialogContentText>
            No contacts found. Create a new contact first to start messaging.
          </DialogContentText>
        ) : (
          <div>
            <DialogContentText>
              Start a new conversation with one or more contacts by selecting
              the checkboxes.
            </DialogContentText>
            <Form onSubmit={handleSubmit}>
              {contacts.map((contact) => (
                <div key={contact.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={() => handleCheckboxChange(contact.id)}
                      />
                    }
                    label={contact.name}
                  />
                </div>
              ))}

              <DialogActions>
                <Button color="primary" type="submit">
                  Create new conversation
                </Button>
              </DialogActions>
            </Form>
          </div>
        )}
      </DialogContent>
    </>
  );
}
