import React, { createContext } from 'react'
import { useState } from 'react'


interface AuthContext {
  user: string | null
}
export const AuthContext = createContext({} as AuthContext)

export const useUser = () => {
  const [user, setUser] = useState<string | null>(null)
  return { user, setUser }
}
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
