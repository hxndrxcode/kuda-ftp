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

export default function UploadFile({ open, act, curPath }) {
  const { store, dispatch } = useContext(RootContext)
  const inputFile = useRef('')

  const handleClose = () => {
    act('dialogUpload', { Open: false })
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
    let config = store.apiConfig
    config.headers['Content-Type'] = 'multipart/form-data'
    Api.post('api/upload', data, config)
      .then(res => {
        act('dialogUpload', { Open: false, Refresh: true })
      })
      .catch(e => handleApiError(e, store, dispatch))
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Upload</Button>
      </DialogActions>
    </Dialog>
  )
}
