import React,{useEffect} from 'react'
import { Login } from '../components/index'

function Signin() {

  useEffect(()=>{
          window.scrollTo({top:0,behavior:'smooth'})
      },[])
  return (
    <div className='mt-16'>
    <Login/>
    </div>
  )
}

export default Signin
