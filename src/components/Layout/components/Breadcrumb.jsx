import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "24px"
  },
  link: {
    display: "flex"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          onClick={handleClick}
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          On Boarding
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
