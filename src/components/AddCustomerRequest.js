import React, { useState } from 'react';
import PropTypes from 'prop-types'
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import '../styles/AddCustomerRequest.css'

const AddCustomerRequest = ({ addCustomerRequestIntoServer }) => {
  
  const [name, setName] = useState('')
  const [expectedArrivalDateTime, setExpectedArrivalDateTime] = useState('')
  const [passengerNum, setPassengerNum] = useState('')
  const [pickUpLatitude, setPickUpLatitude] = useState('')
  const [pickUpLongitude, setPickUpLongitude] = useState('')
  const [destinationLatitude, setDestinationLatitude] = useState('')
  const [destinationLongitude, setDestinationLongitude] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (isNaN(passengerNum) || isNaN(pickUpLatitude) || isNaN(pickUpLongitude) 
    || isNaN(destinationLatitude) || isNaN(destinationLongitude) || isNaN(new Date(expectedArrivalDateTime).getTime()))
      alert("Passenger number, pick up latitude & longitude and destination latitude & longitude must be a number, while format for expected arrival date time is MM/DD/YYYY HH:MM:SS and it must be a valid date time")
    else {
      addCustomerRequestIntoServer(
      {name, expectedArrivalDateTime: new Date(expectedArrivalDateTime), passengerNum: parseInt(passengerNum), pickUpLatitude: parseFloat(pickUpLatitude), pickUpLongitude: parseFloat(pickUpLongitude), 
      destinationLatitude: parseFloat(destinationLatitude), destinationLongitude: parseFloat(destinationLongitude), status: 'Pending'}
      )
      setName('')
      setExpectedArrivalDateTime('')
      setPassengerNum('')
      setPickUpLatitude('')
      setPickUpLongitude('')
      setDestinationLatitude('')
      setDestinationLongitude('')
    }
  }

  return (
      <form onSubmit={onSubmit}>
          <FormControlUnstyled value={name} required>
          {({ filled, focused }) => (
              <>
                  <span>Name:</span> 
                  <Input className={filled ? 'filled' : ''} placeholder='Add Name' onChange={e => setName(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={expectedArrivalDateTime} required>
          {({ filled, focused }) => (
              <>
                  <span>Expected Arrival Date Time:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Format: MM/DD/YYYY HH:MM:SS' onChange={e => setExpectedArrivalDateTime(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={passengerNum} required>
          {({ filled, focused }) => (
            <>
                  <span>Passenger Number:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Passenger Number' onChange={e => setPassengerNum(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={pickUpLatitude} required>
          {({ filled, focused }) => (
              <>
                  <span>Pick Up Latitude:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Pick Up Latitude' onChange={e => setPickUpLatitude(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={pickUpLongitude} required>
          {({ filled, focused }) => (
            <>
                  <span>Pick Up Longitude:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Pick Up Longitude' onChange={e => setPickUpLongitude(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={destinationLatitude} required>
          {({ filled, focused }) => (
            <>
                  <span>Destination Latitude:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Destination Latitude' onChange={e => setDestinationLatitude(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={destinationLongitude} required>
          {({ filled, focused }) => (
            <>
                  <span>Destination Longitude:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Destination Longitude' onChange={e => setDestinationLongitude(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <input type='submit' value='Save Request' />
      </form>
  )
}

AddCustomerRequest.propTypes = {
  addCustomerRequestIntoServer: PropTypes.func.isRequired
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const Input = styled(InputUnstyled)(
  ({ theme }) => `
  
  display: inline-block;

  .${inputUnstyledClasses.input} {
    width: 320px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 8px;
    margin: 10px;
    padding: 12px 12px;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
      cursor: text;
    }

    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
    }
  }

  &.filled .${inputUnstyledClasses.input} {
    box-shadow: 0 0 2px 2px rgba(125, 200, 0, 0.25);
  }
`,
);

const OkMark = styled('span')`
  margin-left: 8px;
  margin-top: 20px;
  position: relative;
  color: rgba(125, 200, 0, 1);
`;

export default AddCustomerRequest