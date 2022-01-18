import { Avatar, IconButton, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fragment } from "react";

export default function DirItem({ item }) {
  
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
              <FolderIcon color="warning" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.Name}
            secondary={item.PrettyTime}
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  )
}