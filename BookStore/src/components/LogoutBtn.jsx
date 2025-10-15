import React, { use } from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import {logout} from '../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()
    const  deleteSession  = async()=>{
            await authservice.logout()
            dispatch(logout())
        
    }

return (
    <div>
        <button className='border-none text-white' onClick={deleteSession}>logout</button>
    </div>
)
    
}

export default LogoutBtn
