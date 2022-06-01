
import { Link } from 'react-router-dom';
import { StarIcon, AnnotationIcon, DesktopComputerIcon, UsersIcon } from "@heroicons/react/solid";

const Training = ({ training }) => {
    return (
        <Link to={{ pathname:`/trainings/${training.id}/reviews`, state: training }}>
            <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg 
            transition duration-200 ease-out">
                <div className="relative h-24 w-40 md:h-40 md:w-80 flex items-center">
                    <img className="h-24 w-40 md:h-40 md:w-80" src={training.image} alt="training image" />
                </div>
                <div className="flex flex-col w-full h-24 md:h-full pl-2 overflow-hidden">
                    <h4 className="text-xl dark:text-white">{training.title}</h4>
                    {/* rating */}
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-cyan-400" />
                        <span className="ml-1 text-sm dark:text-white">{training.avg_rating.toFixed(2)}</span>
                        <span className="w-1 h-1 mx-1.5 bg-slate-600 dark:bg-white rounded-full" />
                        <span className="text-sm font-medium text-slate-600 dark:text-cyan-200 underline hover:no-underline">
                            {training.num_reviews} Review{training.num_reviews === 1 ? "" : "s"}
                        </span>
                    </p>
                    {/* tags */}
                    <div className="text-xs items-center font-bold px-2.5 pt-1.5 space-y-1">
                        {training.tags.map((tag, i) => (
                            <span
                                className="px-1 bg-cyan-100 text-cyan-800 font-medium mr-2 rounded overflow-hidden"
                                key={i}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* binary filters */}
                    <div className="flex items-center text-[.6em] pt-1 pl-2.5">
                        {training.is_online
                            ? <DesktopComputerIcon className="h-[13px] text-cyan-400" />
                            : <UsersIcon className="h-[16px] text-cyan-400" />
                        }
                        <span className="text-slate-900 dark:text-white pl-1">{training.is_online ? "Online" : "In-person"}</span>
                        {/* little dot between */}
                        <span className="w-[.25em] h-[.25em] mx-1.5 bg-slate-400 rounded-full" />
                        <div className="rounded-full border-[1px] text-cyan-400 w-[16px] h-[16px] text-center">
                            {training.is_external ? "E" : "I"}
                        </div>
                        <span className="text-slate-900 dark:text-white pl-1">{training.is_external ? "External" : "Internal"}</span>
                    </div>
                    {/* comment */}
                    <p className="pt-2 text-[.7rem] text-ellipsis overflow-hidden text-slate-600 line-clamp-4 pr-2">
                        <AnnotationIcon className="inline align-top h-3 text-cyan-400" />
                        <span className="inline pl-1 dark:text-white">"{training.top_review}"</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Training;