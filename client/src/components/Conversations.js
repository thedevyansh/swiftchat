import { useConversations } from "../contexts/ConversationsProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <List component="nav">
      {conversations.map((conversation, index) => (
        <ListItem
          key={index}
          button
          onClick={() => selectConversationIndex(index)}
          selected={conversation.selected}
        >
          <ListItemAvatar>
            {conversation.recipients.length === 1 ? (
              <Avatar>
                {conversation.recipients[0].name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar></Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={conversation.recipients
              .map((recipient) => recipient.name)
              .join(", ")}
          />
        </ListItem>
      ))}
    </List>
  );
}
