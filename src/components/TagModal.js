
import { useState, useEffect } from 'react';
import { XIcon } from "@heroicons/react/solid";
import catsBackend from "../apis/catsBackend";

const TagModal = ({ open, onClose, addFilter }) => {
    const [tags, setTags] = useState([]);
    const [tagTerm, setTagTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(tagTerm);
    const [tagSuggestions, setTagSuggestions] = useState([]);
    
    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    }
    const addTag = (tag) => {
        setTags(tags.concat(tag));
    }

    const handleCheckBoxChange = (e) => {
        if (e.target.checked) {
            if (!tags.includes(e.target.value)) {
                addTag(e.target.value);
            }
        } else {
            removeTag(e.target.value);
        }
    }

    const handleSubmit = () => {
        tags.forEach(tag => addFilter(tag));
        onClose();
    }

    useEffect(() => {
        //queue's up debouncedTerm to be changed in 1s
        // ...but if term changes too fast the timer gets reset and requeued
        const timerId = setTimeout(() => {
            setDebouncedTerm(tagTerm);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [tagTerm]);

    useEffect(() => {
        const search = async () => {
            const { data } = await catsBackend.get('allTags', {
                params: {
                    tag_prefix: debouncedTerm,
                    size: 36
                },
            });

            setTagSuggestions(data);
        };
        search();

    }, [debouncedTerm]);

    // reset suggestions when modal closes
    useEffect(() => {
        setTagTerm('');
        setDebouncedTerm('');
        setTags([])
    }, [open]);

    if (!open) return null;
    return (
        <div
            onClick={onClose}
            className="flex fixed bg-black/60 inset-0 z-50 justify-center items-center"
        >
            <div 
                className="w-3/5 h-3/5 bg-white rounded-lg"
                onClick={(e) => e.stopPropagation()}    
            >
                <div className='flex justify-end mt-4 mr-4'>
                    <XIcon
                        className="h-5 w-5 ml-1 text-slate-500 cursor-pointer hover:text-cyan-500"
                        onClick={onClose}
                    />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input
                        className="text-sm text-slate-600 shadow rounded py-3 pl-2 form-input mt-2 block h-5
                        ext-slate-900 bg-slate-50 border border-slate-300 placeholder-slate-300
                        focus:ring-cyan-200 focus:border-cyan-200 focus:ring-1 focus:outline-none"
                        type="text"
                        placeholder="Search Tag"
                        value={tagTerm}
                        onChange={e => setTagTerm(e.target.value)}
                        // react hook form doesnt allow normal submit, so we use onKeyPress
                        onSubmit={() => setDebouncedTerm(tagTerm)}
                    />

                    {/* showing filters you've selected */}
                    <div className="mt-2 flex flex-wrap text-[8px] items-center font-bold px-1 pt-1.5 space-y-1 overflow-hidden">
                        {tags.map((tag, i) => (
                            <span 
                                key={i} 
                                className="px-1 bg-cyan-100 text-cyan-800 font-medium mr-2 rounded hover:cursor-pointer" 
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* checkboxes */}
                    <ul className="grid grid-cols-3 mt-6 w-5/6">
                        {tagSuggestions.map((tag, i) => (
                            <li className='flex items-center my-1' key={i}>
                                <input
                                    className="form-check-input w-3 h-3 border-slate-300 rounded text-cyan-300
                                    dark:accent-cyan-600 focus:ring-transparent transition duration-200 cursor-pointer"
                                    type="checkbox"
                                    id={i}
                                    name={tag.key}
                                    value={tag.key}
                                    onChange={handleCheckBoxChange}
                                />
                                <label
                                    className="form-check-label inline-block text-slate-800 text-xs pl-1 text-overflow-shrink"
                                    htmlFor="checkbox-tag"
                                >
                                    <div className="align-center">
                                        <span className='text-[10px]'>{tag.key}</span>
                                        <span className='pl-1 text-[9px] text-slate-400'>({tag.doc_count})</span>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pr-12 float-right">
                <div className="relative group mt-20">
                    <div className="absolute -inset-0.5 bg-cyan-500 rounded-md blur opacity-25 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300
                    group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    />
                    <button 
                        className="flex relative leading-none px-2 py-2 rounded-md text-white bg-cyan-400"
                        onClick={handleSubmit}  
                    >
                        <span className="text-xs">Add Filters</span>
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};


export default TagModal;