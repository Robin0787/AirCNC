import { useContext, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const { loading, setLoading, signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
    const emailRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // Handle Google SignIn
    function handleGoogleSignIn() {
        signInWithGoogle()
            .then(res => {
                toast.success('Login Successful');
                setLoading(false);
                navigate(from, {replace: true});
            })
            .catch(err => {
                toast.error('Error');
                setLoading(false);
                console.log(err.message);
            });
    }
    // Submit email and password in form
    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(res => {
            toast.success('Login Successful');
            form.reset();
            setLoading(false);
            navigate(from, {replace: true});
        })
        .catch(err => {
            toast.error('Error');
            setLoading(false);
            console.log(err.message);
        })
    }
    // Resetting users password
     function handleResetPassword () {
        const email = emailRef.current.value;
        if(email){
            resetPassword(email)
            .then(() => {toast.success('Reset email sent'); setLoading(false)})
            .catch(err => {toast.error('Error'); setLoading(false);console.log(err.message)});
        }else {
            toast.error('Write Email First');
        }
     }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                ref={emailRef}
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 duration-200'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 duration-200'
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-white'
                            disabled={loading}
                        >
                            {loading ? <TbFidgetSpinner size={24} className='m-auto animate-spin' /> : 'Continue'}
                        </button>
                    </div>
                </form>
                <div className='space-y-1'>
                    <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
                        Forgot password?
                    </button>
                </div>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-400'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-400'></div>
                </div>
                {/* login with Google */}
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login;