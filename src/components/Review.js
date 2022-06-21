
import { useState } from 'react';
import { connect } from "react-redux";
import { StarIcon, ThumbUpIcon, UserCircleIcon } from "@heroicons/react/solid";


const Review = ({ username, reviewDate, review, rating, likes, replies, user }) => {
    
    const [hasImage, setHasImage] = useState(true);
    const [liked, setLiked] = useState(likes.includes(username));
    const color = rating <= 1 ? 'bg-cyan-200' : rating <=3 ? 'bg-cyan-300' : 'bg-cyan-400';
    const [tempLikes, setTempLikes] = useState(likes);

    const onLike = (value) => {
        // want to be able to view it before refreshing the page
        if(value) {
            let newLikes = tempLikes.filter(item => item !== user.username);
            setTempLikes(newLikes);
        } else {
            let newLikes = tempLikes.concat(user.username);
            setTempLikes(newLikes);
        }
        setLiked(!value);
    };

    return (
        <div className="mb-8 max-w-xl">
            <div className="flex items-center space-x-3 mb-3">
                {hasImage 
                    ? (
                        <img
                            className="w-7 h-7 rounded-full text-xs"
                            src={`${process.env.REACT_APP_BACKEND_URL}/userImage/${username}`}
                            alt={`Avatar`}
                            onError={() => setHasImage(false)}
                        />)
                    : <UserCircleIcon className="w-7 h-7 bg-transparent text-slate-700 dark:text-white" />
                }
                <div className="flex flex-col">
                    <span className="text-sm font-bold dark:text-cyan-100">{username}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-200">{reviewDate}</span>
                </div>
            </div>
            <div className="flex items-center mb-1 mt-2">
                {[...Array(rating)].map((star, i) => {
                    return (
                        <StarIcon 
                            key={i}
                            className={`h-4 w-4 text-white ${color} mx-[1px] rounded-sm`}
                        />
                    );
                })}
            </div>
            <div className="mt-3">
                <p className="mb-2 text-sm text-slate-600 dark:text-white">
                    {review}
                </p>

            </div>
            <div className="h-3 flex items-center space-x-1 text-slate-400 dark:text-slate-200">
                <ThumbUpIcon 
                    className={`h-3 ${liked ? 'text-cyan-300' : 'text-slate-300'} hover:text-cyan-300 hover:cursor-pointer`}
                    onClick={() => onLike(liked)}    
                />
                <span className="text-xs">{tempLikes.length===0 ? null : tempLikes.length }</span>
                <div className="pl-2 text-xs hover:text-cyan-300 hover:cursor-pointer">REPLY</div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return (
        {
            user: state.user
        }
    );
};

export default connect(mapStateToProps)(Review);