import { IconButton, Snackbar } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect } from "react";
import { RootContext } from "../context/rootContext";
import Login from "./Login";
import MainApp from "./MainApp";
import CloseIcon from '@mui/icons-material/Close';

export default function Pager() {
    const { store, dispatch } = useContext(RootContext)
    const authToken = localStorage.getItem('auth_token')
    const tryLogin = () => {
        if (!authToken) return false;
        axios.get(store.api + '/auth/token', {
            headers: {Authorization: authToken}
        })
        .then(res => {
            dispatch({
                type: 'set_login',
                data: authToken
            })
        })
        .catch(() => {
            localStorage.removeItem('auth_token')
        })
    }

    const closeAlert = () => {
      dispatch('hide_alert')
    }

    useEffect(() => {
        tryLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const closeEl = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )
    return (
        <Fragment>
          {store.isLogin ? <MainApp /> : <Login />}
          {store.alert ? <Snackbar
            open={true}
            autoHideDuration={2000}
            onClose={closeAlert}
            message={store.alert.message}
            action={closeEl}
          /> : ''}
        </Fragment>
    )
}
