import React, { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice'; // Fixed typo

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

    // Handle user authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/');
            }
        });

        return unsubscribe; // Cleanup listener on unmount
    }, [dispatch, navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            navigate('/error');
        }
    };

    return (
        <header className="absolute z-40 bg-gradient-to-b from-black px-6 py-3 w-full flex flex-col md:flex-row justify-between items-center text-white">
            {/* Logo */}
            <img src={LOGO} alt="logo" className="w-36 md:w-44 mb-2 md:mb-0" />

            {/* Right-side controls */}
            {user && (
                <div className="flex items-center space-x-4">
                    {showGptSearch && (
                        <select
                            className="p-2 bg-gray-900 text-white rounded-md"
                            onChange={(e) => dispatch(changeLanguage(e.target.value))}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button
                        className="py-2 px-4 bg-purple-500 rounded-lg text-white transition hover:bg-purple-600"
                        onClick={() => dispatch(toggleGptSearchView())}
                    >
                        {showGptSearch ? 'Homepage' : 'GPT Search'}
                    </button>

                    {/* User Avatar & Sign Out */}
                    <div className="flex items-center space-x-2">
                        <img src={USER_AVATAR} alt="User Avatar" className="hidden md:block w-10 h-10 rounded-full" />
                        <button
                            onClick={handleSignOut}
                            className="text-sm text-red-400 hover:text-red-500 transition"
                        >
                            (Sign Out)
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
