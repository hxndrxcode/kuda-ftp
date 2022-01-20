import { Avatar, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Fragment } from "react";
import FileOption from "./FileOption";

export default function FileItem({ item, handleClick }) {

  return (
    <Fragment>
      <ListItem secondaryAction={
        <FileOption handleClick={handleClick} item={item}/>
      }
      onClick={() => { handleClick(item) }}
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
