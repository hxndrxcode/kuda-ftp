import { Avatar, ListItem, ListItemButton, ListItemAvatar, ListItemText, Divider } from "@mui/material";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Fragment } from "react";

export default function UpDir({ item, handleClick, contextMenu }) {

  return (
    <Fragment>
      <ListItem onClick={() => { handleClick({ Type: 2 }) }} disablePadding>
        <ListItemButton >
          <ListItemAvatar>
            <Avatar>
              <DriveFolderUploadIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={'Back'}
            secondary={'Go to up folder'}
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  )
}
