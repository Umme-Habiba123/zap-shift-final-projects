import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <p className='text-3xl font-extrabold -ml-2'>ProFast</p>
        </div>
    );
};

export default ProFastLogo;