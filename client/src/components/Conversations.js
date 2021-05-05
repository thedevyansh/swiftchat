import { useConversations } from "../contexts/ConversationsProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  purple: {
    backgroundColor: "#3F51B5",
  },
}));

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  const classes = useStyles()

  return (
    <List component="nav">
      {conversations.map((conversation, index) => (
        <div key={index}>
          <ListItem
            className="mt-1 mb-1"
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
                <Avatar className={classes.purple}></Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={conversation.recipients
                .map((recipient) => recipient.name)
                .join(", ")}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
