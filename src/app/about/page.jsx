'use client'
import React, { useState } from 'react'

export default function About() {
    const [count, setCount] = useState(0);
  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={()=>setCount(count+1)}>Clicked me</button>
    </div>
  )
}

