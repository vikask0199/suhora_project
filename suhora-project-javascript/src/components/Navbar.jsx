import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const username = useSelector((state) => state.auth.currentUser.name)
    const data = useSelector((state) => state.crud.data)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <div className='border-b flex justify-between h-full w-full items-center md:px-10 px-1'>
            <h1 className='font-extrabold text-3xl text-white tracking-widest'>SUHORA</h1>
            <ul className='flex gap-5 font-semibold text-white text-lg '>
                <li className='rounded-full flex items-center justify-center bg-blue-700 px-2'>
                    {data.length > 0 ? (data.length) : '0'}
                </li>
                <li className=''>
                    {username}
                </li>
                <li className=''>
                    <button className='border px-2 rounded-sm flex items-center justify-center hover:bg-white hover:text-purple-700 duration-300' onClick={handleLogOut}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar