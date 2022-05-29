
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSearchTerm, fetchTrainings } from '../actions';
import { SearchIcon } from '@heroicons/react/solid';



const SearchBar = (props) => {
    // this is typing term
    const [term, setTerm] = useState(null);

    useEffect(() => {
        //queue's up debouncedTerm to be changed in 1s
        // ...but if term changes too fast the timer gets reset and requeued
        const timerId = setTimeout(() => {
            props.setSearchTerm(term);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    return (

        <div className="flex flex-grow justify-center items-center w-100">
            <div className='input-group relative flex flex-wrap items-stretch max-h-10 w-full'>
                <input 
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-2 border-2 transition ease-in-out
                        text-sm bg-clip-padding border-slate-300 hover:border-cyan-200 active:border-cyan-300 outline-none rounded-full shadow-sm"
                    type="text" 
                    placeholder="Search..."
                    aria-describedby="search-button"
                    onChange={e => setTerm(e.target.value)}
                    onSubmit={() => props.setSearchTerm(term)}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pl-2">
                    <SearchIcon 
                        className="h-7 mr-2 bg-slate-100 text-slate-600 rounded-full p-2 cursor-pointer"
                        id="search-button"
                    />
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return (
        {
            searchTerm: state.searchTerm
        }
    );
};

const mapDispatchToProps = {
    setSearchTerm,
    fetchTrainings
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);