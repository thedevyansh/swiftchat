import { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import { Button, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export default function OpenConversation() {
  const classes = useStyles();

  const [text, setText] = useState("");
  const { selectedConversation, sendMessage } = useConversations();
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (text !== "") {
      sendMessage(
        selectedConversation.recipients.map((recipient) => recipient.id),
        text
      );
      setText("");
    }
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div>
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Conversation
            </Typography>
            <IconButton color="inherit">
              <StarIcon />
            </IconButton>
            <IconButton color="inherit">
              <PeopleAltIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      <div className="flex-grow-1 overflow-auto mt-3 mb-3">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="d-flex m-2">
        <TextField
          className="flex-grow-1"
          id="outlined-basic"
          label="Enter your message"
          variant="outlined"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <Button
          className="ml-1"
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
