import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react'
import AddDriver from '../components/AddDriver'
import '../styles/Driver.css'

const Driver = () => {

  const heroImage = require('../passenger.jpeg')
  const [drivers, setDrivers] = useState([]);
  const [showAddDriver, setShowAddDriver] = useState(false)
  const heroImageStyle = {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '93.2vh',
    overflow: 'hidden'
  }
  
  useEffect(() => {
    getAllDriversFromServer()
  }, [])
  
  const getAllDriversFromServer = async () => {
    const result = await fetch('http://localhost:8080/api/driver')
    const data = await result.json()
    // * Code below use all() to get all promise with any generic type at once and use then() to convert into array, thus then() iterates once only
    Promise.all(data).then(array => setDrivers(array))
  }

  const addDriverIntoServer = async (driver) => {
    await fetch('http://localhost:8080/api/driver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(driver)
    })
    getAllDriversFromServer()
  }

  const deleteDriverFromServer = async (id) => {
    const result = await fetch(`http://localhost:8080/api/driver/${id}`, {
      method: 'DELETE'
    })
    result.status === 200
      ? setDrivers(drivers.filter(driver => driver.id !== id))
      : alert('Error Deleting This Driver')
  }

  return (
    <div style={heroImageStyle}>
        <u className='title'>(Drivers)</u>
        <Paper elevation={24} className='driver-container'>
          <b className='driver-container-text'>{showAddDriver ? 'Add Driver' : 'Drivers\' List'}</b>
          {drivers.length === 0
            ? <div className='no-driver-text'>No driver added yet</div> 
            : drivers.map((driver, index) => (
                <Paper elevation={1} key={index} className={`driver-menu ${showAddDriver ? 'inactive': 'active'}`}>
                    Name: {driver.name}<br />
                    Car Model: {driver.carModel}<br />
                    Car Maximum Capacity: {driver.carCapacity}<br />
                    Driver's Location: {`${driver.latitude}, ${driver.longitude}`}<br />
                    Current Availability: {driver.available ? 'Yes' : 'No'}<br />
                    <DeleteIcon color='error' className='delete-icon' onClick={() => deleteDriverFromServer(driver.id)} />
                </Paper>
              ))
          }
          <AddDriver addDriverIntoServer={addDriverIntoServer} showAddDriver={showAddDriver} />
        </Paper>
        <Button className='add-driver-button' variant="contained" color="primary" onClick={() => setShowAddDriver(!showAddDriver)}>{showAddDriver ? 'Show drivers\' list' : 'Add driver'}</Button>
    </div>
)
}

export default Driver
