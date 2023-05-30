import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import Logo from './Logo';
import MenuDropdown from './MenuDrowdown';
import Search from './Search';

const Navbar = () => {
    return (
        <div className='fixed bg-white w-full z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex justify-between items-center'>
                            <Link> <Logo /> </Link>
                            <Search />
                            <MenuDropdown />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;