import React, { useState, useRef, useCallback } from 'react';
import Header from './Header';
import { BG_URL } from '../utils/constants';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for password visibility
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    console.log("login render")
    const [isSignInForm, setIsSignForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Spinner state
    const dispatch = useDispatch();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // Toggle between Sign In and Sign Up
    const toggleSignInForm = () => setIsSignForm(!isSignInForm);

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    // Handle authentication (Sign Up / Sign In)
    const handleButtonClick = useCallback(async () => {
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const name = nameRef.current?.value?.trim();

        // Validate form data
        const message = checkValidData(email, password);
        if (message) return setErrorMessage(message);

        setLoading(true); // Show spinner

        try {
            if (!isSignInForm) {
                // Sign Up
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: name,
                    photoURL: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
                });

                dispatch(addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: name,
                    photoURL: user.photoURL
                }));

                toast.success("Sign-up successful! 🎉");
            } else {
                // Sign In
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("Sign-in successful! 🚀");
            }

            setErrorMessage(null); // Clear error message
        } catch (error) {
            setErrorMessage(error.code + " - " + error.message);
            toast.error(error.message); // Show error pop-up
        } finally {
            setLoading(false); // Hide spinner
        }
    }, [isSignInForm, dispatch]);

    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className='absolute inset-0'>
                <img src={BG_URL} alt="bgimg" className='h-screen w-full object-cover' />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className='bg-black  p-8 md:p-12 absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-3/12 text-white rounded-lg bg-opacity-80'
            >
                <h1 className="font-bold text-2xl md:text-3xl py-4 text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        type="text"
                        ref={nameRef}
                        placeholder='Full Name'
                        className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none'
                    />
                )}

                <input
                    type="text"
                    ref={emailRef}
                    placeholder='Email Address'
                    className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none'
                />

                <div className="relative">
                    <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        className='p-3 my-2 w-full bg-gray-700 rounded-md outline-none pr-10'
                    />
                    <span
                        className="absolute top-5 right-3 cursor-pointer text-white"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                <button
                    className='p-2 my-4 bg-red-700 w-full rounded-md flex items-center justify-center'
                    onClick={handleButtonClick}
                    disabled={loading}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    ) : (
                        isSignInForm ? "Sign In" : "Sign Up"
                    )}
                </button>

                {errorMessage && <p className="text-red-500 text-sm py-2 text-center">{errorMessage}</p>}

                <p className='py-4 text-center'>
                    {isSignInForm ? "New to Netflix?" : "Already registered?"}
                    <span onClick={toggleSignInForm} className='font-bold cursor-pointer border-b-2 border-transparent hover:border-white'>
                        {isSignInForm ? " Sign Up Now" : " Sign In"}
                    </span>
                </p>
            </form>

            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
        </div>
    );
};

export default Login;
