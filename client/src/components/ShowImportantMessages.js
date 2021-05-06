import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useConversations } from "../contexts/ConversationsProvider";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ id, open, handleClose }) {
  const classes = useStyles();
  const { selectedConversation } = useConversations();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} elevation={0}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Important messages
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Okay
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {selectedConversation.messages.map((message, index) => {
            let sender;
            if (message.sender === id) sender = "You";
            else {
              let recipients = selectedConversation.recipients;
              let len = recipients.length;
              for (let k = 0; k < len; k++) {
                if (recipients[k].id === message.sender) {
                  sender = recipients[k].name;
                  break;
                }
              }
            }
            return (
              <div key={index}>
                <ListItem button>
                  <ListItemText primary={message.text} secondary={sender} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Dialog>
    </div>
  );
}
