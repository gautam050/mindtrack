import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()
export function useAuth() { return useContext(AuthContext) }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
    return unsub
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
