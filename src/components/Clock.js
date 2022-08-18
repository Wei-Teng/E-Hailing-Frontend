import React, { useState, useEffect } from 'react'
import '../styles/Clock.css'

const Clock = () => {

    const [clockState, setClockState] = useState();

    useEffect(() => {
      setInterval(() => {
        const date = new Date();
        setClockState(date.toLocaleString())
      }, 1000)
    }, [])

    return (
      <span className='clock-state'>Date Time : {clockState}</span>
    )
}

export default Clock