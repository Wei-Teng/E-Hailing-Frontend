import React from 'react'
import PropTypes from 'prop-types'
import * as Icons from '@mui/icons-material'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

const NavBar = ({ showNavBar, negateShowNavBar }) => {

  const data = [
    {
        title: 'Home',
        path: '/',
        icon: <Icons.Home />,
        className: 'nav-text'
    },
    {
        title: 'System Dashboard',
        path: '/system-dashboard',
        icon: <Icons.Dashboard />,
        className: 'nav-text'
    },
    {
        title: 'View Drivers',
        path: '/driver',
        icon: <Icons.DirectionsCar />,
        className: 'nav-text'
    }
  ]

  return (
    <nav className={`nav-menu ${showNavBar && 'active'}`}>
      <ul className='nav-menu-items' onClick={negateShowNavBar}>
        <li className='nav-close-icon'>
          <Link to='#'>
            <Icons.Close />
          </Link>
        </li>
        {data.map((element, index) => (
          <li key={index} className={element.className}>
            <Link to={element.path}>
              {element.icon}
              <span>{element.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

NavBar.propTypes = {
  showNavBar: PropTypes.bool.isRequired,
  negateShowNavBar: PropTypes.func.isRequired
}

export default NavBar
