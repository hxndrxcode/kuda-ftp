import axios from "axios";
import { useContext, useEffect } from "react";
import { RootContext } from "../context/rootContext";
import Login from "./Login";
import MainApp from "./MainApp";

export default function Pager() {
    const { store, dispatch } = useContext(RootContext)
    const authToken = localStorage.getItem('auth_token')
    const tryLogin = () => {
        console.log('tryyy');
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
    useEffect(() => {
        tryLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        store.isLogin ? <MainApp /> : <Login />
    )
}