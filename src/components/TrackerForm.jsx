import React, { useState } from 'react'
import { ref, push } from 'firebase/database'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

export default function TrackerForm() {
  const [activity, setActivity] = useState('')
  const { currentUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!activity) return

    const userRef = ref(db, `users/${currentUser.uid}/entries`)
    await push(userRef, {
      activity,
      date: new Date().toLocaleString(),
    })

    setActivity('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        required
      />
      <button type="submit">Add Activity</button>
    </form>
  )
}
