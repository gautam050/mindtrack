import React from 'react'

export default function TrackerList({ entries }) {
  return (
    <div>
      <h3>Your Logs</h3>
      <ul>
        {entries.map((e, i) => (
          <li key={i}>{e.activity} - {e.date}</li>
        ))}
      </ul>
    </div>
  )
}
