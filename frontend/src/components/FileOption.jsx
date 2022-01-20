import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fragment, useState } from "react";

export default function FileOption({ handleOption, item }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action, item) => {
    handleOption(action, item)
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Fragment>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} edge="end">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={()=>handleClose('', item)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={()=>{handleClose('rename', item)}} sx={{minHeight: 'auto'}}>Rename</MenuItem>
        <MenuItem onClick={()=>{handleClose('delete', item)}} sx={{minHeight: 'auto'}}>Delete</MenuItem>
        <MenuItem onClick={()=>{handleClose('chmod', item)}} sx={{minHeight: 'auto'}}>Chmod</MenuItem>
      </Menu>
    </Fragment>
  )
}
