function reducer(store, action) {
    if (typeof action === 'string') {
        action = { type: action }
    }
    console.log('reducer', action.type, action.data)
    switch (action.type) {
        case 'set_login':
            localStorage.setItem('auth_token', action.data)
            return {
                ...store,
                isLogin: true,
                authHeader: {
                    headers: {
                        Authorization: action.data
                    }
                }
            }
        case 'set_logout':
            localStorage.removeItem('auth_token')
            return {
                ...store,
                isLogin: false,
                authHeader: {
                    headers: {}
                },
            }
        case 'set_warning':
            return {
                ...store,
                alert: {
                    status: 'danger',
                    message: action.data
                }
            }
        case 'set_notif':
            return {
                ...store,
                alert: {
                    status: 'success',
                    message: action.data
                }
            }
        case 'hide_alert':
            return {
                ...store,
                alert: null
            }
        default:
            throw new Error()
    }
}
export default reducer