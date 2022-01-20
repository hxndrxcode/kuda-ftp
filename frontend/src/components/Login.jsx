import { Avatar, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";

export default function Login() {
  const { store, dispatch } = useContext(RootContext)
  const [ form, setForm ] = useState({
    host: '',
    username: '',
    password: '',
    port: ''
  })

  const handleChange = (event) => {
    let f = event.target.id
    let v = event.target.value
    setForm({
      ...form,
      [f]: v
    })
  }
  const loadSavedLogin = () => {
    let get = localStorage.getItem('savedLogin')
    if (!get) return false;

    try {
      let dataLogin = JSON.parse(atob(get))
      setForm(dataLogin)
    }catch(e){}
  }
  const saveForm = (form) => {
    let dataLogin = {}
    for (let i of form.entries()) {
      dataLogin[i[0]] = i[1]
    }
    let enc = btoa(JSON.stringify(dataLogin))
    localStorage.setItem('savedLogin', enc)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.target)
    const remember = form.get('remember')

    Api.post(store.api + '/auth/login', form)
      .then(res => {
        if (remember) {
          saveForm(form)
        }
        dispatch({
          type: 'set_login',
          data: res.data.Data
        })
      })
      .catch(e => handleApiError(e, store, dispatch))

  }

  useEffect(() => {
    loadSavedLogin()
  }, [])
  return (
      <Box
        sx={{
          marginTop: 2,
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="host"
            label="Host"
            name="host"
            autoFocus
            placeholder="127.0.0.1"
            value={form.host}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="username"
            label="Username"
            id="username"
            placeholder="ftpuser"
            value={form.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            name="password"
            label="Password"
            id="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="port"
            label="Port"
            id="port"
            placeholder="21"
            value={form.port}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="1" color="primary" name="remember"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
  )
}
