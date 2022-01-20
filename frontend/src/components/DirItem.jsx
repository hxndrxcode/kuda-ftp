import { Avatar, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { Fragment } from "react";
import FileOption from "./FileOption";

export default function DirItem({ item, act }) {

  return (
    <Fragment>
      <ListItem secondaryAction={
        <FileOption act={act} item={item}/>
      }
        disablePadding
      >
        <ListItemButton
          onClick={() => { act('openFolder', null, item) }}
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon color="warning.light" />
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
