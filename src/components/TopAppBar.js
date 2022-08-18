import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from './NavBar'

const TopAppBar = () => {

  const [showNavBar, setShowNavBar] = useState(false)

  const negateShowNavBar = () => setShowNavBar(!showNavBar)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="regular">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={negateShowNavBar}>
              <MenuIcon />
            </IconButton>
            <NavBar showNavBar={showNavBar} negateShowNavBar={negateShowNavBar} />
            <Typography variant="h6" color="inherit" component="div">
              Grab E-hailing Web Application
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

// * Code below is reference for function's parameter to create and specified default props value and props type

// * defaultProps and propTypes are special property
// TopAppBar.defaultProps = {
//   title: 'Grab E-hailing Web Application',
//   heroImage: require('../grab-driver-centre&kiosks.jpg')
// }

// TopAppBar.propTypes = {
//   title: PropTypes.string.isRequired,
//   heroImage: PropTypes.node.isRequired
// }

export default TopAppBar
