import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function Breadcrumb() {
  const classes = useStyles();
  const history = useHistory();

  function handleClick(event, url) {
    event.preventDefault();
    history.push(`/${url}`)
    console.info('You clicked a breadcrumb.');
  }

  return (
    <div className={classes.root}>
      {/* would like to make this dynamic to user's history */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={()=>handleClick("")}>
          Home
        </Link>
        <Link color="inherit" href="/profile" onClick={()=>handleClick("profile")}>
          My Projects
        </Link>
      </Breadcrumbs>
    </div>
  );
}
