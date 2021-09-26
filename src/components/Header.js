import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { useConversations } from "../contexts/ConversationsProvider";
import ShowImportantMessages from "./ShowImportantMessages";
import Tooltip from "@material-ui/core/Tooltip";

export default function Header({ id, showMembers }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { selectedConversation } = useConversations();
  const members = selectedConversation.recipients.map(
    (recipient) => recipient.name
  );
  members.sort();

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
          <Tooltip title="Important" arrow>
            <IconButton color="inherit" onClick={handleClickOpen}>
              <LabelImportantIcon />
            </IconButton>
          </Tooltip>
          {selectedConversation.recipients.length !== 1 && (
            <Tooltip title="Members" arrow>
              <IconButton color="inherit" onClick={showMembers}>
                <PeopleAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <ShowImportantMessages open={open} handleClose={handleClose} id={id} />
    </div>
  );
}
