import React from 'react'
import Navbar from './Navbar'
import ItemCrud from './ItemCrud'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <>
      {
        isAuthenticated ? (
          <div className='h-screen flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500'>
            <div className='h-[10%] flex items-center justify-center'>
              <Navbar />
            </div>
            <div className='h-[90%] flex items-center justify-center'>
              <ItemCrud />
            </div>
          </div>
        ) : (
          <Link to='/' />
        )
      }
    </>

  )
}

export default Dashboard