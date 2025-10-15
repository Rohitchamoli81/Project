import React,{use, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({children,authenticated}) {

const navigate = useNavigate()
const {status} = useSelector(state => state.auth)
const {loading} = useSelector(state => state.loading)

useEffect(()=>{
    if(authenticated && authenticated !==status){
    return navigate("/login")
    }
    else if(!authenticated&& authenticated !==status){
        return navigate("/")
    }
},[status,authenticated,navigate])
return loading?<span className="loading loading-ring loading-xl flex justify-center items-center"></span>
:children
}

export default AuthLayout
