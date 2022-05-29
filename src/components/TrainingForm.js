
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { XIcon } from "@heroicons/react/solid";

const TrainingForm = () => {

    const [tags, setTags] = useState(['python', 'javascript', 'react', 'node']);
    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    }

    return (
        <div className="mx-20 w-8/12">
            <form className="flex flex-col justify-center mt-10 p-5 mb-4">
                <div className="flex">
                    <label className="block w-1/4">
                        <span className="text-sm text-slate-800">
                            Provider
                        </span>
                        <input
                            className="text-sm shadow rounded py-2 px-3 form-input mt-1 block w-full
                            ext-slate-900 bg-slate-50 border border-slate-300
                            focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none"
                            type="text"
                            placeholder="Provider..."
                        />
                    </label>
                    <div className='ml-10'>
                        <div className='flex ml-4 mt-4'>
                            <div class="flex items-center mr-4">
                                <input id="internal-radio" type="radio" value="interal" name="internal-radio" className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white" />
                                <label for="internal-radio" className="ml-2 text-sm text-slate-800">Internal</label>
                            </div>
                            <div class="flex items-center mr-4">
                                <input id="external-radio" type="radio" value="external" name="internal-radio" className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white" />
                                <label for="external-radio" className="ml-2 text-sm text-slate-800">External</label>
                            </div>
                        </div>

                        <div className="flex ml-4 mt-4">
                            <div class="flex items-center mr-4">
                                <input id="online-radio" type="radio" value="online" name="online-radio" className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white" />
                                <label for="online-radio" className="ml-2 text-sm text-slate-800">Online</label>
                            </div>
                            <div class="flex items-center mr-4">
                                <input id="inperson-radio" type="radio" value="in-person" name="online-radio" className="ml-[.45em] w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white" />
                                <label for="inperson-radio" className="ml-2 text-sm text-slate-800">In-person</label>
                            </div>
                        </div>
                    </div>
                </div>

                <label className="block mt-4 w-3/5">
                    <span className="text-sm text-slate-800">
                        Name
                    </span>
                    <input
                        className="text-sm shadow rounded py-2 px-3 form-input mt-1 block w-full
                        ext-slate-900 bg-slate-50 border border-slate-300
                        focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none"
                        type="text"
                        placeholder="Title of Conference/Training..."
                    />
                </label>

                <div className='mt-4'>
                    <span className="text-sm text-slate-800">
                        Description
                    </span>
                    <textarea 
                        id="description" 
                        rows="4" 
                        className="block shadow py-2 px-3 form-textarea mt-1 w-4/5 text-xs
                        text-slate-900 bg-slate-50 rounded-lg border border-slate-300
                        focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none" 
                        placeholder="Description of Conference/Training..." 
                    />
                </div>
                <label className="block mt-4 w-3/5">
                    <input 
                        type="file" 
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
                        file:rounded-full file:border-0 file:text-sm file:font-semibold rounded-full
                        file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 border border-slate-300
                        focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none"
                        accept="image/*"
                        name='Choose image'
                    />
                    <span className="text-[10px] text-slate-500 px-5">(Background for Conference/Training)</span>
                </label>

                <div className="border-hidden mt-4">
                    <span className="text-sm text-slate-900">Tags:</span>
                    <div className="flex flex-wrap text-[8px] uppercase items-center font-bold px-1 pt-1.5 space-y-1 overflow-hidden">
                        {tags.map((tag, i) => (
                            <div className="flex items-center px-1 py-[0.1em] bg-cyan-100 text-cyan-800 font-medium mr-2 rounded overflow-hidden">
                                <span 
                                    key={i} 
                                    className="uppercase"
                                >
                                    {tag}
                                </span>
                                <XIcon 
                                    className="h-2 w-2 ml-1 text-slate-500 cursor-pointer" 
                                    onClick={() => removeTag(tag)}
                                />
                            </div>
                        ))}
                </div>
        </div>
            </form>
            <div className="float-right mr-40 mt-20">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-cyan-400 rounded-md blur opacity-25 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300
                    group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    />
                    <button className="relative leading-none flex px-2 py-2 rounded-md text-white bg-cyan-400">
                        <span className="text-xs">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrainingForm;