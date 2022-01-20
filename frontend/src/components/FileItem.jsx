import { Avatar, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Fragment } from "react";
import FileOption from "./FileOption";

export default function FileItem({ item, act }) {

  return (
    <Fragment>
      <ListItem secondaryAction={
        <FileOption act={act} item={item}/>
      }
      onClick={() => { act('openFile', null, item) }}
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
