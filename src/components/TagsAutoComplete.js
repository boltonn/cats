
import { useState, useEffect, useRef } from 'react';
import { XIcon } from "@heroicons/react/solid";
import catsBackend from "../apis/catsBackend";


const TagsAutoComplete = () => {

    const [tags, setTags] = useState([]);
    const [tagTerm, setTagTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(tagTerm);
    const [tagSuggestions, setTagSuggestions] = useState([]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [cursor, setCursor] = useState(-1);
    const ref = useRef();

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    }
    const addTag = (tag) => {
        setTags(tags.concat(tag));
    }

    function getDropdownClassName(index, length, cursor) {
        let className = 'px-4 py-1 text-slate-800 text-sm hover:bg-cyan-100';
        if (index === 0) {
            className += ' rounded-t-lg';
        } else if (index === length - 1) {
            className += ' rounded-b-lg';
        }

        if (index === cursor) {
            className += ' bg-cyan-100';
        }
        return className;
    }

    const checkKeyDown = (e) => {
        switch (e.code) {
            case 'Enter':
                if (showDropdown) {
                    if (cursor !== -1) {
                        addTag(tagSuggestions[cursor]);
                    } else {
                        addTag(tagTerm);
                    }
                    setTagTerm('');
                } else {
                    if (tagTerm.length > 0) {
                        addTag(tagTerm);
                    } else {
                        setShowDropdown(true);
                    }
                }
                setCursor(-1);
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            case 'ArrowUp':
                if (cursor > 0) {
                    setCursor(cursor - 1);
                }
                break;
            case 'ArrowDown':
                if (cursor <= tags.length - 1) {
                    setCursor(cursor + 1);
                }
                break;
            default:
                break;
        }
    };

    const selectTag = (tag) => {
        addTag(tag);
        setShowDropdown(false);
        setCursor(-1);
    }

    // close the autocomplete if clicked outside
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current.contains(e.target)) {
                setShowDropdown(false);
                setCursor(-1);
            }
        };
        document.addEventListener('click', listener);
        document.addEventListener('focusin', listener);
        return () => {
            document.removeEventListener('click', listener);
            document.removeEventListener('focusin', listener);

        };
    }, []);

    useEffect(() => {
        //queue's up debouncedTerm to be changed in 1s
        // ...but if term changes too fast the timer gets reset and requeued
        const timerId = setTimeout(() => {
            setDebouncedTerm(tagTerm);
        }, 100);

        return () => {
            clearTimeout(timerId);
        };
    }, [tagTerm]);

    useEffect(() => {
        const search = async () => {
            const { data } = await catsBackend.get('allTags', {
                params: {
                    tag_prefix: debouncedTerm,
                    size: 7
                },
            });

            setTagSuggestions(data);
        };
        search();

    }, [debouncedTerm]);

    // const tagSuggestions = ['python', 'pandas', 'purple', 'peanuts', 'poop'];

    return (
        <div className="border-hidden mt-4">
            <span className="text-sm text-slate-900">Tags:</span>
            <div className="flex flex-wrap text-[8px] uppercase items-center font-bold px-1 pt-1.5 space-y-1 overflow-hidden">
                {tags.map((tag, i) => (
                    <div
                        className="flex items-center px-1 py-[0.1em] bg-cyan-100 text-cyan-800 font-medium mr-2 rounded"
                        key={i}
                    >
                        <span className="uppercase">{tag}</span>
                        <XIcon
                            className="h-2 w-2 ml-1 text-slate-500 cursor-pointer"
                            onClick={() => removeTag(tag)}
                        />
                    </div>
                ))}
            </div>
            {/* search bar for type ahead on tags */}
            <div className='relative w-2/5' ref={ref}>
                <input
                    className="text-xs text-slate-600 shadow rounded py-1 pl-1 form-input mt-2 block h-5
                    ext-slate-900 bg-slate-50 border border-slate-300 placeholder-slate-300
                    focus:ring-cyan-200 focus:border-cyan-200 focus:ring-1 focus:outline-none"
                    type="text"
                    placeholder="Add Tag"
                    value={tagTerm}
                    onChange={e => setTagTerm(e.target.value)}
                    // react hook form doesnt allow normal submit, so we use onKeyPress
                    onKeyDown={e => checkKeyDown(e)}
                    onFocus={() => setShowDropdown(true)}
                // onKeyUp={keyHandler}
                />
                {/* dropdown for autocomplete */}
                {showDropdown && (
                    <ul className='mt-1 absolute shadow-md hover:shadow-lg w-full rounded-lg'>
                        {tagSuggestions.map((tag, i) => (
                            <li
                                className={getDropdownClassName(i, tagSuggestions.length, cursor)}
                                key={tag.key}
                                onClick={() => selectTag(tag.key)}
                            >
                                <div className="flex align-center">
                                    <span className='text-[10px]'>{tag.key}</span>
                                    <span className='pl-1 text-[9px] text-slate-400'>({tag.doc_count})</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TagsAutoComplete;