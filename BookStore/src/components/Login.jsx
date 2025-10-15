import React ,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Input ,Button} from './index'
import {login as authLogin} from '../store/authSlice'
import authservice from '../appwrite/auth'

function Login() {

    const [error , setError] = useState('')
    const navigate = useNavigate()
    const {register , handleSubmit} = useForm()
    const dispatch = useDispatch()

    const login = async (data) => {
        setError('')
        try {
            const res = await authservice.login(data)
            dispatch(authLogin(res))
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

return (
  <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl
            p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    {/* <Logo width='100%'></Logo> */}
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label='email'
                    type='email'
                    placeholder='Enter email'
                    {...register('email',{
                        required:'enter the email',
                        validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label='password'
                    type='password'
                    placeholder='Enter password'
                    {...register('password',{
                        required:'enter the password',
                    })}
                    />
                    <div>
                        <Button type='submit' className='w-full bg-black text-white
                        p-3 rounded-lg hover:bg-black/80 transition'>
                            Sign In
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
