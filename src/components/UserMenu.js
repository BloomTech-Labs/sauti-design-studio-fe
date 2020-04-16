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

  const deleteCookie = () => {
    //we now work with tokens but kept the name to ensure consistent cross over
    localStorage.removeItem("token")
    localStorage.removeItem("id")
}

  return (
    <div className='user-menu-container'>
      <Button className='user-menu-icon' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        User profile
      </Button>
      <Menu
        id="simple-menu"
        className = 'user-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Link className='user-menu-link' to={`/profile`}> Profile </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}> 
            <Link className='user-menu-link' to="/login" onClick={deleteCookie}> Log Out </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
