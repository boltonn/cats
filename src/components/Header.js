
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, PencilIcon, SunIcon, MoonIcon } from '@heroicons/react/solid';
import logo from '../assets/cat.png';
import darkLogo from '../assets/cat_highlight.png';
import SearchBar from './SearchBar';

// TODO: decide if we want the debouncer in search

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // on init read localstorage "dark" value & set dark mode ... or not :)
        const root = window.document.documentElement;
        if (localStorage.getItem("dark")) {
            root.classList.add("dark");
            setIsDarkMode(!isDarkMode);
        } else {
            root.classList.remove("dark");
        }
    }, []);

    const darkModeFunc = () => {
        // func activated by clicking checkebox to toggle dark mode & save to localstorage
        setIsDarkMode(!isDarkMode);
        const root = window.document.documentElement;
        root.classList.toggle("dark");
        localStorage.setItem("dark", root.classList.value);
    };

    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 shadow-md p-5 md:px-10 bg-white dark:bg-slate-900'>
            {/* left icon */}
            <Link to="/">
                <div className='relative flex items-center h-10 cursor-pointer my-auto'>
                    <img 
                        className='object-cover relative h-full max-w-max' 
                        src={isDarkMode ? darkLogo : logo} 
                        alt="logo" 
                    />
                    <h1 className="proxima-nova font-bold text-2xl pl-1 dark:text-white dark:text-shadow">CaTS</h1>
                </div>
            </Link>

            {/* middle */}
            <SearchBar />

            {/* right user and new training */}
            <div className='flex items-center space-x-2 justify-end text-slate-400'>
                <Link to="/training">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-cyan-500 rounded-sm blur opacity-25 
                        group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <button className="relative px-1 py-1 inline-flex items-center align-middle rounded-sm text-white bg-cyan-400">
                            <span className="ml-1 text-xs">New Training</span>
                            <PencilIcon className="ml-1 h-5 text-white" />
                        </button>
                    </div>
                </Link>

                <div className="relative group px-4 py-2.5">
                    <button className="text-slate-700 dark:text-white rounded-lg text-sm text-center inline-flex items-center">
                        <UserCircleIcon className="h-8 bg-transparent text-slate-700 dark:text-white hover:text-cyan-200 cursor-pointer" />
                        <span className="pl-1 text-xs">Nicholas C. Bolton</span>
                    </button>
                    <div className="absolute z-10 hidden bg-white dark:bg-slate-900 group-hover:block w-3/4">
                        <div 
                            className="text-center inline-flex items-center justify-center p-2.5 rounded-lg text-slate-700 dark:text-white hover:text-cyan-200 dark:hover:text-cyan-200 cursor-pointer"
                            onClick={() => darkModeFunc()}
                        >
                            {isDarkMode 
                                ? <SunIcon className="h-4 w-4 bg-transparent" />
                                : <MoonIcon className="h-4 w-4 bg-transparent" />
                            }
                            {isDarkMode 
                                ? <span className="pl-1 text-xs">Light Mode</span>
                                : <span className="pl-1 text-xs">Dark Mode</span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;