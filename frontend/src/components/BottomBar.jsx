import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BottomNavigation, BottomNavigationAction, Box, Container, Paper } from '@mui/material';

export default function BottomBar({ curPath, handleClick }) {
  const backBtnDisabled = curPath === "."
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <Container disableGutters={true} maxWidth="sm">
        <Paper elevation={0}>
          <BottomNavigation
            showLabels
            sx={{ bgcolor: 'primary.light' }}
          >
            <BottomNavigationAction
              sx={{ color: backBtnDisabled ? 'text.disabled' : 'text.secondary' }}
              label="Back"
              icon={<ArrowBackIcon />}
              disabled={backBtnDisabled}
              onClick={() => { handleClick({ Type: 2 }) }}
            />
            <BottomNavigationAction
              onClick={() => { handleClick({ Type: 3 }) }}
              sx={{ color: 'text.secondary' }} label="Create Folder" icon={<CreateNewFolderIcon />} />
            <BottomNavigationAction
              onClick={() => { handleClick({ Type: 4 }) }}
              sx={{ color: 'text.secondary' }} label="Upload File" icon={<UploadFileIcon />} />
          </BottomNavigation>
        </Paper>
      </Container>
    </Box>

  )
}
