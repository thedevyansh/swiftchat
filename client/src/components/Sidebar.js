import { useState } from "react";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";
import { Button, Dialog, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
  },
  label: { textTransform: "capitalize" },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === 0;

  const classes = useStyles();

  function closeModal() {
    setModalOpen(false);
  }

  const handleChange = (event, newValue) => {
    setActiveKey(newValue);
  };

  return (
    <div style={{ width: "350px" }} className="d-flex flex-column">
      <AppBar position="static" elevation={0}>
        <Tabs value={activeKey} onChange={handleChange} centered>
          <Tab label="Conversations" {...a11yProps(0)} />
          <Tab label="Contacts" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div className="border-right overflow-auto flex-grow-1" style={{backgroundColor: "#F8F8F8"}}>
        <TabPanel value={activeKey} index={0}>
          <Conversations />
        </TabPanel>
        <TabPanel value={activeKey} index={1}>
          <Contacts />
        </TabPanel>
      </div>

      <Typography
        style={{ fontSize: "13px", fontWeight: "bold", backgroundColor: "#F8F8F8" }}
        className="p-2 ml-2 border-right"
      >
        Your ID: <span className="text-muted">{id}</span>
      </Typography>

      <Button
        classes={{ root: classes.root, label: classes.label }}
        onClick={() => setModalOpen(true)}
        variant="contained"
        color="primary"
        disableElevation
      >
        New {conversationsOpen ? "Conversation" : "Contact"}
      </Button>

      <Dialog
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Dialog>
    </div>
  );
}
