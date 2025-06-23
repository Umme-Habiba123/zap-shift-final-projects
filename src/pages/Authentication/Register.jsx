import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {register,handleSubmit,formState: { errors } }=useForm()

    const onSubmit=data=>{
        console.log(data)
    }
    return (

        <div className=''>
            <p className='text-4xl font-semibold ml-3 mb-3'>Create An Account</p>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input {...register('email',{required:true})} type="email" className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input {...register('password',
                            {required:true,
                                minLength: 6,
                                maxLength:20
                            })} type="password" className="input" placeholder="Password" />
                        {
                          errors.email?.type==='required' &&
                          <p className='text-red-500'>Email is required</p>
                        }
                        {
                          errors.password?.type==='required' &&
                          <p className='text-red-500'>password is required</p>
                        }
                        {
                          errors.password?.type==='required' &&
                          <p className='text-red-500'>password is required</p>
                        }
                        {
                          errors.password?.type==='minLength' &&
                          <p className='text-red-500'>password must be 6 character or longer</p>
                        }

                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
};

export default Register;