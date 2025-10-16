import React, { useEffect, useState } from 'react'
import { ref, push, onValue } from 'firebase/database'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TrackerForm from '../components/TrackerForm'
import TrackerList from '../components/TrackerList'
import StreakBadge from '../components/StreakBadge'

export default function StudentDashboard() {
  const { currentUser, logout } = useAuth()
  const [entries, setEntries] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) return
    const entriesRef = ref(db, 'users/' + currentUser.uid + '/entries')
    onValue(entriesRef, snapshot => {
      const data = snapshot.val() || {}
      setEntries(Object.values(data))
    })
  }, [currentUser])

  const addEntry = (activity) => {
    const entriesRef = ref(db, 'users/' + currentUser.uid + '/entries')
    push(entriesRef, { activity, date: new Date().toLocaleString() })
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="container">
      <h2>Welcome {currentUser?.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      <TrackerForm onAdd={addEntry} />
      <TrackerList entries={entries} />
      <StreakBadge count={entries.length} />
    </div>
  )
}
