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

export default function CreateFolder({ open, hc, curPath }) {
  const {store} = useContext(RootContext)
  const inputFolder = useRef('')

  const handleClose = () => {
    hc({Type: -3})
  }

  const handleSubmit = () => {
    let val = inputFolder.current.value
    if (!val) {
      alert('Folder Name Required!')
      return
    }

    const data = new URLSearchParams()
    data.set('path', curPath + '/' + val)
    axios.post(store.api + '/api/mkdir', data, store.authHeader)
      .then(res => {
        hc({ Type: 33})
      })
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Folder Name"
          type="text"
          fullWidth
          variant="standard"
          inputRef={inputFolder}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { hc({Type: -3}) }}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
