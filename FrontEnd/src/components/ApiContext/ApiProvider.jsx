import React, { createContext } from 'react'

export const ApiContext = createContext();
export default function ApiProvider({children}) {
  const ALL_API_URL = {
    API_DOCTOR: `${process.env.REACT_APP_API}/api/doctor`,
    API: process.env.REACT_APP_API
  }
  return (
    <ApiContext.Provider value={ALL_API_URL}>
      {children}
    </ApiContext.Provider>
  )
}
