'use client'
import React, { useEffect, useState } from 'react'

export default function Hook() {
    const [count,setCount] = useState(0);

    useEffect(()=>{
        document.title = `You clicked ${count} times `;
    })
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={()=>setCount(count+1)}>Clicked Me</button>
    </div>
  )
}
