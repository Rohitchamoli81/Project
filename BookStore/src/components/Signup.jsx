import React ,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input ,Button} from './index'
import authservice from '../appwrite/auth'

function Logout() {

    const navigate = useNavigate()
    const {register , handleSubmit} = useForm()
    const [error , setError] = useState('')

    const signup = async (data) => {
        setError('')
        try {
            await authservice.createAccount(data)
            navigate('/signin')
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
                    to="/signin"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form
            onSubmit={handleSubmit(signup)}
            className="mt-8"
            >
                <div className="space-y-5">
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        {...register('name',{
                            required: true
                        })}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email',{
                            required: 'Email is required',
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password',{
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                    />
                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-black text-white p-3 rounded-lg hover:bg-black/80 transition"
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
)
}

export default Logout
