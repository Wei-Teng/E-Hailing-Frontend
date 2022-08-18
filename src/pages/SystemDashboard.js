import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material'
import '../styles/SystemDashboard.css'

const SystemDashboard = () => {

    const heroImage = require('../water-drop-on-car-mirror.jpeg')
    const [customers, setCustomers] = useState([])

    const heroImageStyle = {
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '93.2vh',
        overflow: 'hidden'
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getAllCustomerFromServer()
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const getAllCustomerFromServer = async () => {
        const result = await fetch('http://localhost:8080/api/customer')
        const data = await result.json()
        Promise.all(data).then(array => setCustomers(array))
    }
    
    return (
        <div style={heroImageStyle}>
            <u className='title'>(System Dashboard)</u>
            <Paper elevation={24} className='customer-status-container'>
                <b className='customer-status-container-text'>Customers' Statuses</b>
                {customers.length === 0
                    ? <div className='no-customer-text'>No customer added yet</div> 
                    : customers.map((customer, index) => {
                        let expectedArrivalDateTime = customer.expectedArrivalDateTime
                        return (
                            <Paper elevation={1} key={index} className='customer-menu'>
                                Customer Name: {customer.name}<br />
                                Expected Arrival Date Time: {expectedArrivalDateTime.replace('T', ' ')}<br />
                                Passenger Number: {customer.passengerNum}<br />
                                Customer Status: {customer.status}<br />
                                Customer's Pick Up Location: {`${customer.pickUpLatitude}, ${customer.pickUpLongitude}`}<br />
                                Customer's Destination Location: {`${customer.destinationLatitude}, ${customer.destinationLongitude}`}<br />
                                Driver Name: {customer.status !== 'Pending' && customer.status !== 'Reached' ? customer.connectToList[0].driver.name : '-'}<br />
                            </Paper>
                        )
                    })
                }
            </Paper>
        </div>
    )
}

export default SystemDashboard
