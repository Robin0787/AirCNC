import React from 'react';
import logo from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <div>
            <img src={logo} alt="" className='hidden md:block' width={100} height={100} />
        </div>
    );
};

export default Logo;