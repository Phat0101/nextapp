import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '@/context/ThemeContext'
import Link from 'next/link'

const Navbar = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className={`flex justify-between p-6 py-3 ${theme === 'light' ? 'bg-blue-500' : 'bg-gray-800'} text-white`}>
      <Link href="/"
        className="text-2xl font-semibold tracking-wide cursor-pointer">Contacts
      </Link>
      <button onClick={toggleTheme} className=" text-white font-bold py-2 px-4 rounded">
        {theme === 'dark' ? <FaMoon /> : <FaSun />}
      </button>
    </nav>
  )
}

export default Navbar