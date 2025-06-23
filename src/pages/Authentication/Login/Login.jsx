import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit ,formState:{errors}} = useForm()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>

                    <input
                        {...register('email',{required:true})}
                        type="email"
                        className="input"
                        placeholder="Email" />

                    <label className="label">Password</label>
                    <input {...register('password',{required:true,
                    minLength : 6,
                     maxLength:20})}
                        type="password"
                        className="input"
                        placeholder="Password" />

                        {
                          errors.password?.type ==='required' && (
                            <p role="alert" className='text-red-500'>Password is Required  </p>
                          )
                        }
                        {
                            errors.password?.type==='minLength' && <p className='text-red-500'>
                                Password must be 6 character
                            </p>
                        }

                    <div>
                        <a className="link link-hover">Forgot password?</a>
                    </div>

                    <button className="btn btn-neutral mt-4">Login</button>

                </fieldset>
            </form>
        </div>
    );
};

export default Login;