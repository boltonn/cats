
import { Link } from 'react-router-dom';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/solid';
import logo from '../assets/cat.png';
import SearchBar from './SearchBar';

// TODO: decide if we want the debouncer in search

const Header = () => {
    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 shadow-md p-5 md:px-10 bg-slate-700'>
            {/* left icon */}
            <Link to="/">
                <div className='relative flex items-center h-10 cursor-pointer my-auto'>
                    <img className='object-cover relative h-full max-w-max' src={logo} alt="logo" />
                    <h1 className="proxima-nova font-bold text-2xl">CaTS</h1>
                </div>
            </Link>

            {/* middle */}
            <SearchBar />

            {/* right user and new training */}
            <div className='flex items-center space-x-4 justify-end text-slate-400'>
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
                <UserCircleIcon className="h-8 bg-transparent text-slate-600 cursor-pointer" />
            </div>
        </header>
    );
}

export default Header;