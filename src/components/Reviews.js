
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useParams, useLocation, Link } from "react-router-dom";
import { StarIcon, TagIcon } from "@heroicons/react/solid";
import { fetchReviews } from "../actions";
import ProgressBar from "./ProgressBar";
import Review from "./Review";

// TODO: 
//     fetch from DB if you go straight to the page and aren't linked?
//     decide whether num_reviews should be calculated on fly or pulled from trainings index

const Reviews = (props) => {
    const location = useLocation();
    const training = location.state;
    const { id } = useParams();
    const [ratingPercents, setRatingPercents] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        // make sure props not undefined
        if (props) {
            // console.log("fetching reviews");
            props.fetchReviews(id);
        }
    }, []);

    // recalculate rating percentages
    useEffect(() => {
        setRatingPercents([5, 4, 3, 2, 1].map(key => (
            `${(props.reviews.rating_aggs[key]/training.num_reviews*100).toFixed(1)}%`
        )));
    }, [props.reviews]);

    return (
        <div>
            {/* big head */}
            <div className="flex items-center justify-center bg-cyan-50 border-y border-black py-10 lg:py-0 w-full">
                <img
                    className="hidden md:inline-flex h-32 lg:h-full object-contain" 
                    // src={training.image} 
                    src={`${process.env.REACT_APP_BACKEND_URL}/trainingImage/${id}`}
                    alt="Training Image" 
                />
                <div className="px-5">
                    <h1 className="text-4xl max-w-xl font-serif">
                        {training.title}
                    </h1>
                    <p className="pt-2 text-[.7rem] text-ellipsis overflow-hidden text-slate-600 line-clamp-4 pr-2">
                        <span className="pl-1">{training.description}</span>
                    </p>
                </div>
            </div>
            <div className="flex my-3 px-2 justify-center items-center space-x-2">
                <Link to={{ pathname:`/trainings/${training.id}/review`, state: training }}>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-cyan-500 rounded-sm blur opacity-25 
                        group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <button className="relative px-1 py-1 inline-flex items-center align-middle rounded-sm text-white bg-cyan-400">
                            <StarIcon className="h-5 text-transparent stroke-white stroke-[1.5px]" />
                            <span className="ml-1 text-xs">Write a Review</span>
                        </button>
                    </div>
                </Link>
                <button 
                    className="relative px-1 py-1 inline-flex items-center align-middle rounded-sm 
                    border border-slate-400 hover:border-cyan-300"
                    data-bs-toggle="modal" 
                    data-bs-target="#staticBackdrop"
                >
                    <TagIcon className="h-4 text-transparent stroke-slate-800 dark:stroke-white stroke-[1.5px]" />
                    <span className="ml-1 text-xs text-slate-800 dark:text-white">Tag</span>
                </button>
                {/* modal for taggging */}

            </div>

            {/* tags */}
            <div className="flex text-xs font-bold items-center justify-center mx-20 pt-1.5">
                <span className="pr-2">Tags: </span>
                <div className="space-y-1">
                    {training.tags.map((tag, i) => (
                        <span
                            className="px-1 py-[0.1em] bg-cyan-100 text-cyan-800 font-medium mr-2 rounded overflow-hidden"
                            key={i}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="mx-4 mt-8 pb-5">
                <div className="flex items-center justify-center mb-1">
                    <span className="star text-cyan-300">&#9733;</span>
                    <p className="ml-1 text-sm font-medium text-slate-900 dark:text-white">{training.avg_rating} out of 5</p>
                </div>
                <p className="flex justify-center text-sm font-medium text-slate-500 dark:text-cyan-300 pl-1">{training.num_reviews} User Review{training.num_reviews === 1 ? "" : "s"}</p>
                {(props.isLoading) ? (
                    <span>Loading...</span>
                ) : (
                    ratingPercents.map((pcnt, index) => (
                        <ProgressBar 
                            key={index} 
                            percentage={pcnt} 
                            number={5-index} />
                    )))
                }
            </div>

            <div className="grid place-items-center mt-10 mr-10">
                <div className="flex flex-start flex-col">
                    {props.reviews.data.map(review => (
                        <Review 
                            key={review._id} 
                            username={review.username} 
                            reviewDate={review.review_date}
                            review={review.review}
                            rating={review.rating}
                            likes={review.likes}
                            replies={review.replies}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            reviews: state.reviews,
            isLoading: state.isLoading,
        }
    );
};

const mapDispatchToProps = {
    fetchReviews
};


export default connect(mapStateToProps, mapDispatchToProps)(Reviews);