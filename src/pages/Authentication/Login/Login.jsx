import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const Login = () => {
    const {signInWithGoogle,user}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()
    const {signInUser}=useAuth()
    const axiosIntance=useAxios()

    const from =location.state?.from || '/';

    const { register, handleSubmit, formState: { errors } } = useForm()


    const onSubmit = data => {
        console.log(data)      
     signInUser(data.email, data.password)
     .then(async(result)=>{
        console.log(result.user)

          const userInfo={
                    email: user.email,
                    role: 'user', //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const res=await axiosIntance.post('/users',userInfo)
                console.log('user update info',res.data)

        navigate(from)
     }).catch(error=>{
        console.log(error  )
     })
    }

    const handleSignIn=()=>{
        signInWithGoogle()
        .then(result=>{
            console.log(result)
            navigate(from)
        }).catch(error=>{
            console.log(error)
        })
    }



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>

                    <input
                        {...register('email', { required: true })}
                        type="email"
                        className="input"
                        placeholder="Email" />

                    <label className="label">Password</label>
                    <input {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20
                    })}
                        type="password"
                        className="input"
                        placeholder="Password" />

                    {
                        errors.password?.type === 'required' && (
                            <p role="alert" className='text-red-500'>Password is Required  </p>
                        )
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 character
                        </p>
                    }

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                     <button className="btn btn-neutral bg-[#CAEB66] text-black mt-4 hover:bg-amber-600 font-semibold lg:text-lg text-sm lg:w-80">Login</button>

                    <p>Already have an account?
                        <Link state={from} to={'/register'}>
                            <button className='btn btn-link'>
                                Register</button>
                        </Link>
                    </p>

                </fieldset>
                   <p className='ml-37 my-3'>OR</p>

                <button type='button' onClick={handleSignIn} className="btn bg-white  text-black border-[#e5e5e5] px-23 hover:bg-gray-300">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Login;