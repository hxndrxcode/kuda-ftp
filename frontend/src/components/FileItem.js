import { Avatar, IconButton, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fragment } from "react";

export default function FileItem({ item }) {
  
  return (
    <Fragment>
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="option">
          <MoreVertIcon />
        </IconButton>
      }
      disablePadding
      >
        <ListItemButton >
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.Name}
            secondary={item.PrettySize + ' | ' + item.PrettyTime}
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  )
}