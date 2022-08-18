import React, { useState } from 'react';
import PropTypes from 'prop-types'
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import '../styles/AddDriver.css'

const AddDriver = ({ addDriverIntoServer, showAddDriver }) => {
  
  const [name, setName] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carCapacity, setCarCapacity] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (isNaN(carCapacity) || isNaN(latitude) || isNaN(longitude))
      alert("Car maximum capacity, driver's latitude and longitude fields must be a number")
    else {
      addDriverIntoServer(
        {name, carModel, carCapacity: parseInt(carCapacity), latitude: parseFloat(latitude), longitude: parseFloat(longitude), available: true}
      )
      setName('')
      setCarModel('')
      setCarCapacity('')
      setLatitude('')
      setLongitude('')
    }
  }

  return (
      <form className={`add-menu ${showAddDriver ? 'active' : 'inactive'}`} onSubmit={onSubmit}>
          <FormControlUnstyled value={name} required>
          {({ filled, focused }) => (
              <>
                  <span>Name:</span> 
                  <Input className={filled ? 'filled' : ''} placeholder='Add Name' onChange={e => setName(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={carModel} required>
          {({ filled, focused }) => (
              <>
                  <span>Car Model:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Car Model' onChange={e => setCarModel(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={carCapacity} required>
          {({ filled, focused }) => (
            <>
                  <span>Car Maximum Capacity:</span>
                  <Input className={filled ? 'filled' : ''} placeholder='Add Car Maximum Capacity' onChange={e => setCarCapacity(e.target.value)}/>
                  {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={latitude} required>
          {({ filled, focused }) => (
              <>
                <span>Driver's Latitude:</span>
                <Input className={filled ? 'filled' : ''} placeholder='Add Latitude' onChange={e => setLatitude(e.target.value)}/>
                {filled && !focused && <OkMark>✔</OkMark>}
              </>
          )}
          </FormControlUnstyled>
          <FormControlUnstyled value={longitude} required>
          {({ filled, focused }) => (
            <>
              <span>Driver's Longitude:</span>
              <Input className={filled ? 'filled' : ''} placeholder='Add Longitude' onChange={e => setLongitude(e.target.value)}/>
              {filled && !focused && <OkMark>✔</OkMark>}
            </>
          )}
          </FormControlUnstyled>
          <input type='submit' value='Save Driver' />
      </form>
  )
}

AddDriver.propTypes = {
  addDriverIntoServer: PropTypes.func.isRequired,
  showAddDriver: PropTypes.bool.isRequired
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

export default AddDriver