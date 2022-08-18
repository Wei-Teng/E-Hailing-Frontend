import React, { useState, useEffect } from 'react'
import { Paper } from '@mui/material';
import AddCustomerRequest from '../components/AddCustomerRequest'
import ChooseDriver from '../components/ChooseDriver'
import '../styles/Home.css'

const Home = () => {

    const heroImage = require('../grab-driver-centre&kiosks.jpg')
    const [chooseDriver, setChooseDriver] = useState(false)
    const [targetCustomer, setTargetCustomer] = useState({})
    const [chooseList, setChooseList] = useState([])
 
    const heroImageStyle = {
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '93.2vh',
        overflow: 'hidden'
    }
    
    let intervalId = 0

    useEffect(() => {
        if (Object.keys(targetCustomer).length !== 0) {
            negateChooseDriver()
            intervalId = setUpdateChooseListInterval()
        }
        // * Before react executes the effect, it will run the function we returned, cleaning up previous effect and deleting the old interval
        return stopUpdateChooseList
    }, [targetCustomer])

    const negateChooseDriver = () => setChooseDriver(!chooseDriver)

    const resetTargetCustomer = () => setTargetCustomer({})

    const addCustomerRequestIntoServer = async (customerRequest) => {
        await fetch('http://localhost:8080/api/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerRequest)
        })
        setTargetCustomer(customerRequest)
    }

    const setUpdateChooseListInterval = () => (
        setInterval(getChooseListFromServer, 500)
    )
    
    const stopUpdateChooseList = () => {
        // * cannot use clearInterval(setUpdateChooseListInterval()) as it will initialize another new interval and then clear that new interval only
        clearInterval(intervalId)
    }

    const getChooseListFromServer = async () => {
        const result = await fetch(`http://localhost:8080/api/customer/connection/${targetCustomer.name}/${targetCustomer.pickUpLatitude}/
        ${targetCustomer.pickUpLongitude}/${targetCustomer.destinationLatitude}/${targetCustomer.destinationLongitude}`)
        const data = await result.json()
        Promise.all(data).then(array => setChooseList(array))
    }

    return (
        <div style={heroImageStyle}>
            <u className='title'>(Home Page)</u>
            <Paper elevation={24} className='create-customer-container'>
                <b className='create-customer-container-text'>Create Customer Request</b>
                <AddCustomerRequest addCustomerRequestIntoServer={addCustomerRequestIntoServer}/>
            </Paper>
            {chooseDriver && <ChooseDriver targetCustomer={targetCustomer} chooseList={chooseList} 
                                resetTargetCustomer={resetTargetCustomer} negateChooseDriver={negateChooseDriver}/>}
        </div>
    )
}

export default Home
