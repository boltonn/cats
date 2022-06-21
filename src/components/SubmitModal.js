
import { XIcon, ExclamationCircleIcon } from "@heroicons/react/solid";

// TODO: might want to tie clicking on tag to uncheck a box and remove tag from state

const SubmitModal = ({ open, onClose, onConfirm }) => {

    const handleSubmit = () => {
        onConfirm();
        onClose();
    }

    if (!open) return null;
    return (
        <div
            onClick={onClose}
            className="flex fixed bg-black/60 inset-0 z-50 justify-center items-center"
        >
            <div 
                className="bg-white rounded-lg h-modal"
                onClick={(e) => e.stopPropagation()}    
            >
                <div className='flex justify-end mt-4 mr-4'>
                    <XIcon
                        className="h-5 w-5 ml-1 text-slate-500 cursor-pointer hover:text-cyan-500"
                        onClick={onClose}
                    />
                </div>
                <div className="p-6 text-center">
                    <ExclamationCircleIcon className="mx-auto mb-4 w-14 h-14 text-white fill-slate-500" />
                    <h3 className="mb-5 text-lg font-normal text-gray-400">
                        Are you sure you want to submit this review?
                    </h3>
                    <div className='inline-flex items-center py-2.5 space-x-4 pr-7'>
                        <div 
                            className="relative group"
                            onClick={handleSubmit}
                        >
                            <div className="absolute -inset-0.5 bg-cyan-400 rounded-md blur opacity-25 
                            focus:ring-4 focus:outline-none focus:ring-cyan-300 text-md
                            group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                            />
                            <button
                                className="relative leading-none flex px-2 py-2 rounded-md text-white bg-cyan-400"
                                type="submit"
                            >
                                <span className="text-sm">Yes, I'm sure</span>
                            </button>
                        </div>
                        <button 
                            type="button" 
                            className="h-9 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                            focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2
                            hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                            dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={onClose}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SubmitModal;