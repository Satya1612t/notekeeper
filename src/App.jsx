import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Body from './components/Body'
import { Toaster } from 'react-hot-toast'

function App() {

  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className=' bg-white text-black h-screen '>
      <Navigation setSearchTerm={setSearchTerm}  />
      <Body searchTerm={searchTerm} />
      
      <Toaster/>
    </div>
  )
}

export default App