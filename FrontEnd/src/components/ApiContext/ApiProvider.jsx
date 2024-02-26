import React, { createContext } from 'react'

export const ApiContext = createContext();
export default function ApiProvider({children}) {
  const ALL_API_URL = {
    API_DOCTOR: 'http://localhost:8080/api/doctor',
    API:'http://localhost:8080'
  }
  return (
    <ApiContext.Provider value={ALL_API_URL}>
      {children}
    </ApiContext.Provider>
  )
}
