import React from 'react'

export default function StreakBadge({ count }) {
  if (count === 0) return null
  return <p>🔥 Streak: {count} days logged!</p>
}
