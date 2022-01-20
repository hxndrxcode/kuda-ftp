import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { useContext } from 'react';
import { RootContext } from '../context/rootContext';
import { Api, handleApiError } from '../helper/Api';

export default function CreateFolder({ open, act, curPath }) {
  const { store, dispatch} = useContext(RootContext)
  const inputFolder = useRef('')

  const handleClose = () => {
    act('dialogCreateFolder', { Open: false })
  }

  const handleSubmit = () => {
    let val = inputFolder.current.value
    if (!val) {
      alert('Folder Name Required!')
      return
    }

    const data = new URLSearchParams()
    data.set('path', curPath + '/' + val)
    store.authHeader.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    Api.post('api/mkdir', data.toString(), store.authHeader)
      .then(res => {
        act('dialogCreateFolder', { Open: false, Refresh: true })
      })
      .catch(e => handleApiError(e, store, dispatch))
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Create</Button>
      </DialogActions>
    </Dialog>
  )
}
