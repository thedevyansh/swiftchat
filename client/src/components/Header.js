import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useConversations } from "../contexts/ConversationsProvider";

export default function Header({ showMembers }) {
  const { selectedConversation } = useConversations();
  const members = selectedConversation.recipients.map((recipient) => recipient.name)
  members.sort()

  return (
    <div>
      <AppBar position="static" elevation={0}>
        <Toolbar variant="dense">
          <IconButton color="inherit" disabled>
            <PeopleAltIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: "18px" }}>
            {members.join(", ")}
          </Typography>
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
          {selectedConversation.recipients.length !== 1 && (
            <IconButton color="inherit" onClick={showMembers}>
              <PeopleAltIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
