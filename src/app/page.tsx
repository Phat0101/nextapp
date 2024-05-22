'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import Contact from '@/app/contact'
import { ThemeContext } from '@/context/ThemeContext'

const Home = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const contactsPerPage = 10

  useEffect(() => {
    try {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setContacts(data))
    } catch (error) {
      console.error(error)
    }
  }, [])

  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (e.target.value !== '') {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSort = (field: string) => {
    setSortField(field)
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedSuggestion(prev => (prev < filteredContacts.length - 1 ? prev + 1 : prev))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedSuggestion(prev => (prev > 0 ? prev - 1 : prev))
      } else if (event.key === 'Enter' && selectedSuggestion !== -1) {
        event.preventDefault()
        setSearch(filteredContacts[selectedSuggestion].name)
        setShowSuggestions(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [filteredContacts, selectedSuggestion])

  const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1))
  }

  const indexOfLastContact = currentPage * contactsPerPage
  const indexOfFirstContact = indexOfLastContact - contactsPerPage
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact)

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
      <div className="flex flex-col items-center">
        <Input
          className="my-4 w-full max-w-7xl"
          placeholder="Search contacts..."
          value={search}
          onChange={handleSearchChange}
        />
        {showSuggestions && (
          <div className={`z-10 w-full max-w-7xl border border-gray-300 rounded shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`} style={{ backgroundColor: `rgba(255, 255, 255, 0.5)` }}>
            {filteredContacts.slice(0, 5).map((contact, index) => (
              <motion.div
                key={contact.id}
                className={`p-2 text-sm cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-slate-700'} ${index === selectedSuggestion ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setSearch(contact.name)
                  setShowSuggestions(false)
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {contact.name}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Table className={`mx-6 ${theme === 'light' ? '' : 'text-slate-300 bg-slate-900'}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortDirection === 'desc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleSort('username')}>
              Username {sortField === 'username' && (sortDirection === 'desc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleSort('email')}>
              Email {sortField === 'email' && (sortDirection === 'desc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleSort('phone')}>
              Phone {sortField === 'phone' && (sortDirection === 'desc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleSort('website')}>
              Website {sortField === 'website' && (sortDirection === 'desc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="font-bold">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentContacts.map(contact => (
            <TableRow key={contact.id}>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.name}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.username}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.email}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.phone}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.website}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {contact.company.name}
                </Link>
              </TableCell>
              <TableCell className="py-5">
                <Link href={`/profile/${contact.id}`}>
                  {`${contact.address.street}, ${contact.address.suite}, ${contact.address.city}, ${contact.address.zipcode}`}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${theme === 'light' ? 'text-white bg-blue-500 hover:bg-blue-700' : 'text-black bg-gray-500 hover:bg-gray-700'}`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span className={`self-center ${theme === 'light' ? '' : 'text-slate-300'}`}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 ml-2 rounded ${theme === 'light' ? 'text-white bg-blue-500 hover:bg-blue-700' : 'text-black bg-gray-500 hover:bg-gray-700'}`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Home