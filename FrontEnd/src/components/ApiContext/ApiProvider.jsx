import React, { createContext } from 'react'

export const ApiContext = createContext();
export default function ApiProvider({children}) {
  const ALL_API_URL = {
    API_DOCTOR: 'http://192.168.1.64:8080/api/doctor',
    API:'http://192.168.1.64:8080'
  }
  return (
    <ApiContext.Provider value={ALL_API_URL}>
      {children}
    </ApiContext.Provider>
  )
}
