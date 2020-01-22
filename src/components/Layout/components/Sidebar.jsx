import React, { useContext } from "react";
import clsx from "clsx";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../../../context/auth/authContext";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(43, 193, 246, .1)",
      borderLeft: `4px solid #2bc1f6`,
      borderRadius: "4px",
      "& $listItemIcon": {
        color: "#138ee9",
        marginLeft: "-4px"
      }
    },
    "& + &": {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid #2bc1f6`,
    borderRadius: "4px",
    backgroundColor: "rgb(43, 193, 246, .1)",
    "& $listItemText": {
      color: theme.palette.text.primary
    },
    "& $listItemIcon": {
      color: "#138ee9",
      marginLeft: "-4px"
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));
const Sidebar = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          key={"home"}
          className={classes.listItem}
          component={NavLink}
          activeClassName={classes.activeListItem}
          exact
          to="/home"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={"Home"}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={"logout"}
          className={classes.listItem}
          onClick={() => authContext.logout()}
          component={Link}
          to="/login"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={"Logout"}
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
