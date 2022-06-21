
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TagsAutoComplete from './TagsAutoComplete';
import catsBackend from '../apis/catsBackend';
import qs from 'qs';

// DEPRECATED: this way seemed to have a file size limit (could resize the image but was a pain)

const TrainingForm = () => {
    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();

    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);

    const uploadImage = async e => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const base64String = base64.replace("data:", "").replace(/^.+,/, "");
        const encodedbase64String = encodeURIComponent(base64String);
        setImage(encodedbase64String);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () =>{
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    const onSubmit = data => {
        data = { ...data, tags }
        data.is_internal = data.is_internal === 'internal' ? true : false;
        data.is_online = data.is_online === 'online' ? true : false;
        console.log(data);
        if (image === null) {
            catsBackend.post(`/training/?${qs.stringify(data)}`, {})
        } else {
            // only way i could get the image to not be cut off (still a max size limit)
            catsBackend.post(`/training/?${qs.stringify(data)}&image=${image}`, {})
        };
    };

    return (
        <div className="mx-20 w-8/12">
            <form
                className="flex flex-col justify-center mt-10 p-5 mb-4"
            >
                <div className="flex">
                    <label className="block w-1/4">
                        <span className={`text-sm ${errors.provider ? "text-pink-500" : "text-slate-800"}`} >
                            Provider
                        </span>
                        <input
                            className={`text-sm shadow rounded py-2 px-3 form-input mt-1 block w-full
                            ext-slate-900 bg-slate-50 border focus:ring-1 focus:outline-none ${errors.provider
                                    ? 'text-red-300 border-pink-500 focus:ring-pink-600 focus:border-pink-600'
                                    : 'border-slate-300 focus:ring-cyan-300 focus:border-cyan-300'
                                }`}
                            type="text"
                            id="provider"
                            name="provider"
                            placeholder="Provider..."
                            {...register('provider', { required: true })}
                        />
                        {errors.provider && errors.provider.type === "required" && (
                            <span className="text-xs text-pink-500 error">You must enter a provider</span>
                        )}
                    </label>

                    {/* the two radio buttons, one other the under */}
                    <div className='ml-10'>
                        <div className='flex ml-4 mt-4'>
                            <div className="flex items-center mr-4">
                                <input
                                    id="internal-radio"
                                    type="radio"
                                    value="interal"
                                    name="internal-radio"
                                    className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white"
                                    {...register('is_internal', { required: true })}
                                />
                                <label htmlFor="internal-radio" className="ml-2 text-sm text-slate-800">Internal</label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    id="internal-radio"
                                    type="radio"
                                    value="external"
                                    name="internal-radio"
                                    className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white"
                                    {...register('is_internal', { required: true })}
                                />
                                <label htmlFor="external-radio" className="ml-2 text-sm text-slate-800">External</label>
                            </div>
                        </div>
                        {errors.is_internal && errors.is_internal.type === "required" && (
                            <span className="ml-4 text-xs text-pink-500 error">You must select Internal or External</span>
                        )}

                        <div className="flex ml-4 mt-4">
                            <div className="flex items-center mr-4">
                                <input
                                    id="online-radio"
                                    type="radio"
                                    value="online"
                                    name="online-radio"
                                    className="w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white"
                                    {...register('is_online', { required: true })}
                                />
                                <label htmlFor="online-radio" className="ml-2 text-sm text-slate-800">Online</label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    id="inperson-radio"
                                    type="radio"
                                    value="in-person"
                                    name="online-radio"
                                    className="ml-[.45em] w-4 h-4 text-cyan-300 bg-slate-100 border-slate-300 focus:ring-white"
                                    {...register('is_online', { required: true })}
                                />
                                <label htmlFor="inperson-radio" className="ml-2 text-sm text-slate-800">In-person</label>
                            </div>
                        </div>
                        {errors.is_online && errors.is_online.type === "required" && (
                            <span className="ml-4 text-xs text-pink-500 error">You must select Online or In-person</span>
                        )}
                    </div>
                </div>

                {/* Name of the training */}
                <label className="block mt-4 w-3/5">
                    <span className={`text-sm ${errors.title ? "text-pink-500" : "text-slate-800"}`} >
                        Name
                    </span>
                    <input
                        className={`text-sm shadow rounded py-2 px-3 form-input mt-1 block w-full
                        ext-slate-900 bg-slate-50 border border-slate-300 focus:ring-1 focus:outline-none ${errors.title
                                ? 'text-red-300 border-pink-500 focus:ring-pink-600 focus:border-pink-600'
                                : 'border-slate-300 focus:ring-cyan-300 focus:border-cyan-300'
                            }`}
                        type="text"
                        placeholder="Title of Conference/Training..."
                        {...register('title', { required: true })}
                    />
                </label>
                {errors.title && errors.title.type === "required" && (
                    <span className="ml-4 text-xs text-pink-500 error">You must enter in a title</span>
                )}

                {/* Description of the training */}
                <div className='mt-4'>
                    <span className={`text-sm ${errors.description ? "text-pink-500" : "text-slate-800"}`}>
                        Description
                    </span>
                    <textarea
                        type="text"
                        id="description"
                        rows="4"
                        className={`block shadow py-2 px-3 form-textarea mt-1 w-4/5 text-xs
                        bg-slate-50 rounded-lg border border-slate-300 focus:ring-1 focus:outline-none ${errors.description
                                ? 'text-red-300 border-pink-500 focus:ring-pink-600 focus:border-pink-600'
                                : 'border-slate-300 focus:ring-cyan-300 focus:border-cyan-300 text-slate-900'
                            }`}
                        placeholder="Description of Conference/Training..."
                        {...register('description', { required: true })}
                    />
                </div>
                {errors.description && errors.description.type === "required" && (
                    <span className="ml-4 text-xs text-pink-500 error">You must enter in a description</span>
                )}

                {/* upload of image to represent training */}
                <label className="block mt-4 w-3/5">
                    <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
                        file:rounded-full file:border-0 file:text-sm file:font-semibold rounded-full
                        file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 border border-slate-300
                        focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none"
                        accept="image/*"
                        name='Choose image'
                        onChange={uploadImage}
                        // {...register('image')}
                    />
                    <span className="text-[10px] text-slate-500 px-5">(Background for Conference/Training)</span>
                </label>

                <TagsAutoComplete tags={tags} setTags={setTags} />
            </form>
            <div
                className="float-right mr-40 mt-20"
                onClick={handleSubmit(onSubmit)}
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-cyan-400 rounded-md blur opacity-25 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300
                    group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    />
                    <button
                        className="relative leading-none flex px-2 py-2 rounded-md text-white bg-cyan-400"
                        type="submit"
                    >
                        <span className="text-xs">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TrainingForm;