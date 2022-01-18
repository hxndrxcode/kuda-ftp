import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
export const RootContext = createContext()

const {
  REACT_APP_API_URL
} = process.env

const RootProvider = ({ children }) => {
  const authToken = localStorage.getItem('auth_token') || ''
  const [ store, dispatch ] = useReducer(reducer, {
    isLogin: false,
    api: REACT_APP_API_URL,
    authHeader: {
      headers: { Authorization: authToken }
    },
    authToken,
    isNotFound: false
  })
  return  (
    <RootContext.Provider value={{ store, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;