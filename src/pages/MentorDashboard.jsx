import React, { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function MentorDashboard() {
  const { logout } = useAuth()
  const [allData, setAllData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const usersRef = ref(db, 'users')

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const formatted = Object.entries(data).map(([uid, val]) => ({
          uid,
          name: val.name || 'Unknown',
          email: val.email || 'No email',
          entries: val.entries ? Object.values(val.entries) : []
        }))
        setAllData(formatted)
      } else {
        setAllData([])
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mentor Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: '20px' }}>
        {allData.length === 0 ? (
          <p>No student activity found.</p>
        ) : (
          allData.map((student) => (
            <div key={student.uid} style={{ marginBottom: '20px' }}>
              <h3>{student.name}</h3>
              <p>{student.email}</p>
              <ul>
                {student.entries.map((entry, index) => (
                  <li key={index}>
                    <strong>{entry.activity}</strong> — {entry.date}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
