import classNames from 'classnames'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  {
    id: 1,
    path: "/",
    text: "Home",
  },
  {
    id: 2,
    path: "/about",
    text: "About",
  },
]

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)

  const handleTogle = () => {
    setNavbarOpen(prev => !prev);
  }

  const closeMenu = () => {
    setNavbarOpen(false);
  }

  return (
    <nav className="navBar">
      <button onClick={handleTogle}>{navbarOpen ? "Close" : "Open"}</button>
      <ul className={classNames('menuNav', {'showMenu': navbarOpen})}>
        {links.map(link => {
          return (
            <li key={link.id}>
              <NavLink to={link.path} activeClassName="active-link" exact onClick={closeMenu}>{link.text}</NavLink>              
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
