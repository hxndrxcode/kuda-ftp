import { Avatar, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { Fragment } from "react";
import FileOption from "./FileOption";

export default function DirItem({ item, handleClick, handleOption }) {

  return (
    <Fragment>
      <ListItem secondaryAction={
        <FileOption handleOption={handleOption} item={item}/>
      }
        disablePadding
      >
        <ListItemButton
          onClick={() => { handleClick(item) }}
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
