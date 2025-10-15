import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'
import { useSelector } from 'react-redux'
import {LogoutBtn,Input} from '../../components/index'
import Drawer from './Drawer'

function Nav() {

    const navigate = useNavigate()
    const status = useSelector(state=>state.auth.status)
    
    

return (
<nav className="navbar shadow-sm bg-stone-300 fixed top-0 left-0  z-50 h-10  ">
    <div className="flex-1">
    <a className="text-xl"><img className='w-auto h-40 ' src="/logo/logo.png" alt="" /></a>
    </div>

    <div className="flex-1 flex justify-center mr-80">
    <ul className='flex space-x-7 text-black font-semibold'>
        <li onClick={()=>navigate('/')} className="cursor-pointer hover:text-gray-700">Home</li>
        <li className="cursor-pointer hover:text-gray-700">AboutUs</li>
        <li className="cursor-pointer hover:text-gray-700">ContactUs</li>
    </ul>
    </div>

    <div className="flex gap-2">
        <Input
        placeholder='Enter the book or author name '
        />
    </div>

    <div className="ml-2 dropdown m-auto flex  ">
            <div tabIndex={0} role="button" className=" "><img className='w-10 rounded-full' src="/logo/login.png" alt="logo" />
            </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 ">
                    {
                        !status?<li className='text-white' onClick={()=>navigate('./signin')} ><a>login</a></li>:""
                    }
                    {
                        !status?<li className='text-white' onClick={()=>navigate('/signup')}><a>signup</a></li>:""
                    }
                    {
                        status?<li><LogoutBtn/></li>:""
                    }
                </ul>   
    </div>
    <Drawer/>
</nav>
)
}

export default Nav