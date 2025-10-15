import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Input,CardBtn as Button } from '../index'
import { set, useForm } from 'react-hook-form'
import { authService } from '@/appwrite/auth'

function Register() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error ,setError] = React.useState("")

    const onSubmit = async (data) => {
        try {
            const response = await authService.createAccount(data)
            console.log('Registration successful:', response)
            navigate('/login')
        } catch (error) {
            setError(error.message)
        }
    }
return (
   <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    {/* <Logo width="100%" /> */}
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    {...register('name', { required: true })}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email', { required: true ,
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    })}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', { required: true, minLength: 6 })}
                />
            </div>
            <div className="mt-8">
                <Button
                    type="submit"
                    className="w-full rounded-md bg-blue-400 px-4 py-3 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-blue-500 "
                >
                    Create Account
                </Button>
            </div>
        </form>
    </div>
)
}

export default Register
