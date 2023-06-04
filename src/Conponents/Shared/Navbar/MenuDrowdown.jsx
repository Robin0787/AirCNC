import { useCallback, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { becomeHost } from '../../../APIs/auth';
import { AuthContext } from '../../../providers/AuthProvider';
import HostRequestModal from '../../Modal/HostRequestModal/HostRequestModal';
import Avatar from './Avatar';

const MenuDropdown = () => {
    const [modal, setModal] = useState(false);
    const { user, logOut, userRole } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);
    console.log(userRole);
    const modalHandler = email => {
        becomeHost(email)
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('You are host now, Post rooms!');
                    setModal(false);
                } else {
                    toast.error('You are host already');
                    setModal(false);
                }
            })
    }
    const closeModal = () => {
        setModal(false);
    }
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div className={`hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition`}>
                   {
                    userRole ? '' :  <button className='cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed' onClick={() => setModal(true)} disabled={!user} > AirCNC your home</button>
                   }
                </div>
                {/* Dropdown Menu */}
                <div
                    onClick={toggleOpen}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        <Link
                            to='/'
                            className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                            Home
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    to='/dashboard'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Dashboard
                                </Link>

                                <div
                                    onClick={logOut}
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                >
                                    Logout
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            <HostRequestModal email={user?.email} isOpen={modal} modalHandler={modalHandler} closeModal={closeModal} />
        </div>
    )
}

export default MenuDropdown;