import { useContacts } from "../contexts/ContactsProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <List component="nav">
      {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={contact.name} />
          </ListItem>
      ))}
    </List>
  );
}
