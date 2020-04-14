import React from 'react';
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        User profile
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Link to={`/profile`}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}> 
            <Link to="/" onClick={()=>this.deleteCookie("user_id")}>Log Out</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
