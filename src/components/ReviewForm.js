
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { postReview } from '../actions';


const ReviewForm = (props) => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const username = "tester";
    console.log(id);
    console.log(username);
    console.log(rating);
    console.log(review);

    return (
        <div className="mx-10 w-8/12 mt-10 px-5">
            <span className="text-m text-slate-800">
                Review
            </span>
            <form className="flex flex-col mb-3">
                <div className="flex items-center mb-2">
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
                <textarea
                    id="message"
                    rows="30"
                    className="block p-2.5 w-full text-xs text-slate-900 bg-slate-50 rounded-lg 
                    border border-slate-300 focus:ring-cyan-300 focus:border-cyan-300 focus:ring-1 focus:outline-none"
                    placeholder='Leave a review...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </form>
            <div className="float-right mr-3">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-cyan-500 rounded-md blur opacity-25 
                    focus:ring-4 focus:outline-none focus:ring-cyan-300
                    group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
                    />
                    <button 
                        className="relative leading-none flex px-2 py-2 rounded-md text-white bg-cyan-400"
                        onClick={() => props.postReview(id, username, rating, review)}  
                    >
                        <span className="text-xs">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    postReview
};


export default connect(null, mapDispatchToProps)(ReviewForm);