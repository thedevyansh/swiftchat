import { Typography } from "@material-ui/core";
import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export default function ShowGroupMembers() {
  const { selectedConversation } = useConversations();
  const numberOfMembers = selectedConversation.recipients.length + 1;

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column border-left">
      <Typography style={{ fontWeight: 500 }} className="ml-4 mt-3 mb-2">
        Members - {numberOfMembers}
      </Typography>

      <List component="nav">
        <ListItem key={numberOfMembers - 1}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="You" />
        </ListItem>

        {selectedConversation.recipients.map((recipient) => (
          <ListItem key={recipient.id}>
            <ListItemAvatar>
              <Avatar>{recipient.name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={recipient.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
