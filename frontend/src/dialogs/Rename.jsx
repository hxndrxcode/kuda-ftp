import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { useContext } from 'react';
import { RootContext } from '../context/rootContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Api, handleApiError } from '../helper/Api';

export default function Rename({ open, act, curPath, item }) {
  const { store, dispatch } = useContext(RootContext)
  const inputName = useRef(item.Name)
  const f = item.Type === 1 ? 'Folder' : 'File'
  const [fVal, setFVal] = useState('')

  const handleChange = (e) => {
    setFVal(e.target.value)
  }
  const handleClose = () => {
    act('dialogRename', { Open: false })
  }

  const handleSubmit = () => {
    let val = inputName.current.value
    if (!val) {
      alert(f + ' Name Required!')
      return
    }

    const data = new URLSearchParams()
    data.set('path', curPath)
    data.set('from', item.Name)
    data.set('to', val)
    store.apiConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    Api.post('api/rename', data.toString(), store.apiConfig)
      .then(res => {
        act('dialogRename', { Open: false, Refresh: true })
      })
      .catch(e => handleApiError(e, store, dispatch) )
  }

  useEffect(() => {
    if (item.Name) {
      setFVal(item.Name)
    }
  }, [item])
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rename {f}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label={f + ' Name'}
          type="text"
          fullWidth
          variant="standard"
          inputRef={inputName}
          onChange={handleChange}
          value={fVal}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Rename</Button>
      </DialogActions>
    </Dialog>
  )
}
