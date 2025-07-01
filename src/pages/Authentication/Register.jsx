import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate} from 'react-router';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUserProfile, signInWithGoogle ,} = useAuth()
    const [profilePic,setProfilePic]=useState('')
    const axiosIntance=useAxios()
     const navigate=useNavigate()
     const location=useLocation()
    const from =location.state?.from || '/';



    const onSubmit = data => {
        console.log(data)

        createUser(data.email, data.password)
            .then(async(result) => {
                console.log(result.user)

                const userInfo={
                    email: data.email,
                    role: 'user', //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes=await axiosIntance.post('/users',userInfo)
                console.log(userRes.data)


                const userProfile={
                    displayName: data.name ,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log('Profile name pic updated')
                }).catch(error=>{
                    console.log(error)
                })
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRegister = () => {
        signInWithGoogle()
            .then(async(result) => {
                console.log(result.user)
                   const loggedUser = result.user;
                  const userInfo = {
        email: loggedUser.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

        // check & insert user
      const userRes = await axiosIntance.post('/users', userInfo);
      console.log('user update info',userRes.data);

                navigate(from)
            }).catch(error => {
                console.log(error)
            })
    }

    const handleImageUpload = async(e) => {
        const image = e.target.files[0]
        console.log('files',image)

        const formData=new FormData()
        formData.append('image', image)
        const imageUploadUrl=`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_Key}`

        const res=await axios.post(imageUploadUrl, formData)

        setProfilePic(res.data.data.url)
    }


    return (

        <div className=''>
            <p className='text-4xl font-semibold ml-3 mb-3'>Create An Account</p>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input {...register('name', { required: true })} type="text" className="input" placeholder="Your Name" />

                        <label className="label">Your profile picture</label>
                        <input onChange={handleImageUpload} type="file" className="input cursor-pointer" placeholder="Your profile picture" />

                        <label className="label">Email</label>
                        <input {...register('email', { required: true })} type="email" className="input" placeholder="Email" />

                        {/* password field--- */}
                        <label className="label">Password</label>
                        <input {...register('password',
                            {
                                required: true,
                                minLength: 6,
                                maxLength: 20
                            })} type="password" className="input" placeholder="Password" />
                        {
                            errors.email?.type === 'required' &&
                            <p className='text-red-500'>Email is required</p>
                        }

                        {
                            errors.password?.type === 'required' &&
                            <p className='text-red-500'>password is required</p>
                        }
                        {
                            errors.password?.type === 'required' &&
                            <p className='text-red-500'>password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' &&
                            <p className='text-red-500'>password must be 6 character or longer</p>
                        }

                        <button className="btn btn-neutral bg-[#CAEB66] text-black mt-4 hover:bg-amber-600 font-semibold lg:text-lg">Register</button>
                        <p>Already have an account?
                            <Link to={'/login'}>
                                <button className='btn btn-link'>
                                    Login</button>
                            </Link>
                        </p>
                    </fieldset>
                    <p className='text-center'>OR</p>
                    <button onClick={handleRegister} type='button' className="btn bg-white text-black border-[#e5e5e5] hover:bg-gray-300">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Register;