import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { RootContext } from '../context/rootContext';

export default function UploadFile({ open, hc, curPath }) {
  const {store} = useContext(RootContext)
  const inputFile = useRef('')

  const handleClose = () => {
    hc({Type: -4})
  }

  const handleSubmit = () => {
    let file = inputFile.current.files[0]
    if (!file) {
      alert('Select The File!')
      return
    }

    const data = new FormData()
    data.append('path', curPath)
    data.append('file', file)
    let config = store.authHeader
    config.headers['Content-Type'] = 'multipart/form-data'
    axios.post(store.api + '/api/upload', data, config)
      .then(res => {
        hc({ Type: 44})
      })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload File</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Select File"
          type="file"
          fullWidth
          variant="standard"
          inputRef={inputFile}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { hc({Type: -4}) }}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Upload</Button>
      </DialogActions>
    </Dialog>
  )
}
