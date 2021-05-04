import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

export default function Header({showMembers}) {
  return (
    <div>
      <AppBar position="static" elevation={0}>
        <Toolbar variant="dense">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Conversation
          </Typography>
          <IconButton color="inherit">
            <StarIcon />
          </IconButton>
          <IconButton color="inherit" onClick={showMembers}>
            <PeopleAltIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
