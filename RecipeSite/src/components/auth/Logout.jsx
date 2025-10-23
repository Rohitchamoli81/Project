import React from 'react'
import { AuthService } from '@/appwrite/auth';
import { removeUser } from '@/store/authSlice';
import { useDispatch } from 'react-redux'

function Logout() {
    const dispatch = useDispatch();
    const authService = new AuthService();
    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(removeUser());
        }
        catch (error) {
            console.log('Logout::Error', error);
        }
    }
return (
    <button onClick={handleLogout} >
        Logout
    </button>
)
}

export default Logout
