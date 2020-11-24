import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    // Hook to change the state for hamberger
    const [ click, setClick ] = useState(false)

    const handelClick = () => {
        setClick(click => !click)
    }

    return (
        <nav className='navbar-items' >
            <h1 className='navbar-logo' ><i className="fab fa-github"></i> GitHub Manager</h1>
            <div className='menu-icon' onClick={handelClick} > <i className={click?'fas fa-times': 'fas fa-bars'} ></i> </div> 
            <ul className={click? 'nav-menu active': 'nav-menu'} >
                <li>
                    <Link className='nav-links' to='/'>Home</Link>
                </li>
                <li>
                    <Link className='nav-links' to='/search'>Add repo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar

