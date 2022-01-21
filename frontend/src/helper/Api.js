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

  console.log('ERROR HANDLED:', err.toString())
  if (err.response) {
    if (err.response.data.Message.indexOf('broken pipe')) {
      axios.get(store.api + '/auth/token', store.apiConfig)
      .then(res => {
        dispatch({
          type: 'set_warning',
          data: 'Session expired. Please try again'
        })
      })
      .catch(() => {
        localStorage.removeItem('auth_token')
        dispatch({
          type: 'set_warning',
          data: 'Session expired. Please logout and re-login'
        })
      })
      return
    }

    if (err.response.data.Message === 'invalid token') {
      dispatch({
        type: 'set_warning',
        data: 'Session expired. Please logout and re-login'
      })
      return
    }

    if (err.response.data.Message) {
      dispatch({
        type: 'set_warning',
        data: err.response.data.Message
      })
      return
    }
  } else {
    console.error('NON-API ERROR:', err)
    return
  }
}

export const Api = axios.create({
  baseURL: ApiURL,
  params: {
    t: new Date().getTime()
  }
})
