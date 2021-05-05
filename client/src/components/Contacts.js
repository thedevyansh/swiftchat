import { useContacts } from "../contexts/ContactsProvider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <List component="nav">
      {contacts.map((contact) => (
        <div key={contact.id}>
          <ListItem className="mt-1 mb-1">
            <ListItemAvatar>
              <Avatar>
                {contact.name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={contact.name} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
