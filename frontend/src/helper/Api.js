const ApiURL = process.env.REACT_APP_API_URL
const axios = require('axios')

export const handleApiError = (err, store, dispatch) => {
  if (err.toString() === 'Error: Network Error') {
    dispatch({
      type: 'set_warning',
      data: 'Network Error'
    })
    return
  }

  console.log('ERROROROROR', err.toString())
  if (err.response) {
    if (err.response.data.Message.indexOf('broken pipe')) {
      axios.get(store.api + '/auth/token', store.authHeader)
      .then(res => {
        dispatch({
          type: 'set_warning',
          data: 'Session expired. Please try again'
        })
      })
      .catch(() => {
        localStorage.removeItem('auth_token')
      })
    }
    if (err.response.status === 401) {
      dispatch({
        type: 'set_warning',
        data: 'Session expired. Please logout and re-login'
      })
    }
    if (err.response.data.Message) {
      dispatch({
        type: 'set_warning',
        data: err.response.data.Message
      })
    }
  } else {
    console.error(err)
  }
}

export const Api = axios.create({
  baseURL: ApiURL,
  params: {
    t: new Date().getTime()
  }
})
