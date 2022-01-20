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
import { useState } from 'react';
import { useEffect } from 'react';

export default function Rename({ open, hc, curPath, item }) {
  const { store } = useContext(RootContext)
  const inputName = useRef(item.Name)
  const f = item.Type === 1 ? 'Folder' : 'File'
  const [fVal, setFVal] = useState('')


  const handleChange = (e) => {
    setFVal(e.target.value)
  }
  const handleClose = () => {
    hc({ Type: -5 })
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
    store.authHeader.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.post(store.api + '/api/rename', data.toString(), store.authHeader)
      .then(res => {
        hc({ Type: 55 })
      })
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
        <Button onClick={() => { hc({ Type: -5 }) }}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>Rename</Button>
      </DialogActions>
    </Dialog>
  )
}
