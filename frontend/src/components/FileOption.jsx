import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fragment, useState } from "react";

export default function FileOption({ act, item }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    act(action, { Open: true }, item)
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <IconButton aria-describedby={id} variant="contained" onClick={openMenu} edge="end">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={()=>handleClose('')}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={()=>{handleClose('dialogRename')}} sx={{minHeight: 'auto'}}>Rename</MenuItem>
        <MenuItem onClick={()=>{handleClose('dialogDelete')}} sx={{minHeight: 'auto'}}>Delete</MenuItem>
      </Menu>
    </Fragment>
  )
}
