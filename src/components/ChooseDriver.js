import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@mui/material';
import '../styles/ChooseDriver.css'
import CheckIcon from '@mui/icons-material/Check';

const ChooseDriver = ({ targetCustomer, chooseList, resetTargetCustomer, negateChooseDriver }) => {

  let customerId = 0;

  const setUpCustomerWithChosenDriver = async (driverId) => {
    const result = await fetch(`http://localhost:8080/api/customer/${targetCustomer.name}/${targetCustomer.pickUpLatitude}/${targetCustomer.pickUpLongitude}
                  /${targetCustomer.destinationLatitude}/${targetCustomer.destinationLongitude}/${driverId}`)
    customerId = await result.json()
  }
  
  const updateCustomerStatusWhenPickedUp = (milliSecond) => (
    setTimeout(() => {
      fetch(`http://localhost:8080/api/customer/${customerId}`)
    }, milliSecond)
  )

  const updateCustomerStatusAndDriverAvailabilityWhenReachDestination = (driverId, milliSecond) => (
    setTimeout(() => {
      fetch(`http://localhost:8080/api/customer/${customerId}/${driverId}`)
    }, milliSecond)
  )

  return (
    <div className='overlay'>
      <Paper className='modal-container'>
          {chooseList.length === 0 
            ? <div className='no-suitable-driver-text'>Sorry, no suitable driver was discovered :&#40;</div> 
            : chooseList.map((detail, index) => (
                <Paper elevation={1} key={index} className='select-driver-menu'>
                    Name: {detail.driver.name}<br />
                    Car Model: {detail.driver.carModel}<br />
                    Driver's Location: {`${detail.driver.latitude}, ${detail.driver.longitude}`}<br />
                    Estimated Picked Up Time &#40;minutes&#41;: {detail.timeTakenPickedUpByDriverInMinute}<br />
                    Estimated Arrival Time At Destination &#40;minutes&#41;: {detail.timeTakenToReachDestinationInMinute}
                    <CheckIcon color='error' className='check-icon' onClick={() => {
                      negateChooseDriver()
                      resetTargetCustomer()
                      setUpCustomerWithChosenDriver(detail.driver.id)
                      updateCustomerStatusWhenPickedUp(detail.timeTakenPickedUpByDriverInMinute*60*1000)
                      updateCustomerStatusAndDriverAvailabilityWhenReachDestination(detail.driver.id, (detail.timeTakenPickedUpByDriverInMinute+detail.timeTakenToReachDestinationInMinute)*60*1000)
                    }} />
                </Paper>
              ))
          }
      </Paper>
    </div>
  )
}

ChooseDriver.propTypes = {
  targetCustomer: PropTypes.object.isRequired,
  chooseList: PropTypes.array.isRequired,
  resetTargetCustomer: PropTypes.func.isRequired,
  negateChooseDriver: PropTypes.func.isRequired
}

export default ChooseDriver