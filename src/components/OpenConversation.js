import { useState, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import { Button, TextField } from "@material-ui/core";
import Header from "./Header";
import SendIcon from "@material-ui/icons/Send";

export default function OpenConversation({ id, showMemberList }) {
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
      <Header showMembers={showMemberList} id={id} />

      <div className="flex-grow-1 overflow-auto mt-3 mb-3">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;

            const styleMessage = {
              borderRadius: "20px",
              padding: "5px 14px",
              fontSize: "15px",
              maxWidth: "400px",
              backgroundImage: `${
                message.fromMe
                  ? "linear-gradient(to right, #9733ee, #da22ff)"
                  : "linear-gradient(to right, #b3cdd1, #9fa4c4)"
              }`,
            };

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
                  style={styleMessage}
                  className={`${message.fromMe ? "text-white" : ""}`}
                >
                  {message.text}
                </div>
                <div
                  style={{ fontSize: "11px" }}
                  className={`mt-1 mr-1 text-muted ${
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
          style={{ backgroundColor: "#F8F8F8" }}
          className="flex-grow-1"
          id="outlined-basic"
          label="Enter your message"
          variant="outlined"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <Button
          className="ml-2"
          color="primary"
          variant="contained"
          disableElevation
          type="submit"
        >
          <SendIcon />
        </Button>
      </Form>
    </div>
  );
}
