import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useContext } from 'react';
import { RootContext } from '../context/rootContext';
import { DialogContentText } from '@mui/material';

export default function DeleteItem({ open, hc, curPath, item }) {
  const { store } = useContext(RootContext)
  const f = item.Type === 1 ? 'Folder' : 'File'

  const handleClose = () => {
    hc({ Type: -6 })
  }

  const handleSubmit = (force) => {
    const data = new URLSearchParams()
    data.set('path', curPath)
    data.set('item', item.Name)
    data.set('type', item.Type)
    if (force === true) {
      data.set('force', 1)
    }

    store.authHeader.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.post(store.api + '/api/delete', data.toString(), store.authHeader)
      .then(res => {
        hc({ Type: 66 })
      })
      .catch(err => {
        try {
          if (item.Type === 1 && err.response.data.Message === '550 Remove directory operation failed.') {
            let c = window.confirm('It seems the folder is not empty. Do you still want to delete it?')
            if (c) {
              handleSubmit(true)
            } else {
              hc({ Type: 66 })
            }
          }
        } catch(e) {}
      })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete {f}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to delete <b>{item.Name}</b></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { hc({ Type: -6 }) }}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}
