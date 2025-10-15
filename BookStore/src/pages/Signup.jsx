import React,{useEffect} from 'react'
import { Logout as SignupUser } from '../components/index'

function Signup() {
  useEffect(()=>{
          window.scrollTo({top:0,behavior:'smooth'})
      },[])
  return (
    <div className='mt-16'>
<SignupUser/>
    </div>
  )
}

export default Signup
