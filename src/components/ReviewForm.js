
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { postReview } from '../actions';
import SubmitModal from './SubmitModal';


const ReviewForm = (props) => {
    const { id } = useParams();
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [hasRatingError, setHasRatingError] = useState(false);
    const [review, setReview] = useState('');
    const [hasReviewError, setHasReviewError] = useState(false);


    useEffect(() => {
        if(rating !== 0) {
            setHasRatingError(false);
        }
    }, [rating]);

    useEffect(() => {
        if(review !== '') {
            setHasReviewError(false);
        }
    }, [review]);

    const onSubmit = () => {
        console.log(rating);
        if(rating === 0) {
            setHasRatingError(true);
        }
        if(review === '') {
            setHasReviewError(true);
        }
        console.log(id, props.user.username, rating, review);
        // props.postReview(id, username, rating, review);
    };

    return (
        <div className="mx-10 w-8/12 mt-10 px-5 pb-20">
            <span className={`text-md ${ hasRatingError || hasReviewError ? 'text-pink-500' : 'text-slate-800 dark:text-white'}`}>
                Review
            </span>
            <form className="flex flex-col mb-3">
                <div 
                    className="flex items-center"
                >
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? "h-5 text-cyan-300" : "h-5 text-cyan-100"}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    })}
                </div>
                {hasRatingError && (
                    <span className="text-xs text-pink-500 error">Must select a rating</span>
                )}
                <textarea
                    type='review'
                    id="message"
                    rows="30"
                    className={`mt-2 block p-2.5 w-full text-xs bg-slate-50 rounded-lg border focus:ring-1 focus:outline-none
                    ${hasReviewError
                        ? 'border-pink-500 focus:ring-pink-600 focus:border-pink-600'
                        : 'border-slate-300 focus:ring-cyan-300 focus:border-cyan-300 text-slate-900'}`}
                    placeholder='Leave a review...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    // {...register('review', { required: true })}
                />
                {hasReviewError && (
                    <span className="ml-4 text-xs text-pink-500 error">Your review cannot be empty</span>
                )}
            </form>
            <div className="float-right mr-3">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-cyan-500 rounded-md blur opacity-25 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300
                    group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    />
                    <button 
                        className="relative leading-none flex px-2 py-2 rounded-md text-white bg-cyan-400"
                        onClick={() => setIsSubmitModalOpen(true)}  
                    >
                        <span className="text-xs">Submit</span>
                    </button>
                </div>
            </div>
            <SubmitModal 
                open={isSubmitModalOpen} 
                onClose={() => setIsSubmitModalOpen(false)} 
                onConfirm={onSubmit} 
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return (
        {
            user: state.user
        }
    );
};

const mapDispatchToProps = {
    postReview
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);