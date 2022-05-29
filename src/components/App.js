
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from "./Header";
import Trainings from "./Trainings";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import TrainingForm from "./TrainingForm";


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Route exact path="/" component={Trainings} />
                <Route exact path="/trainings/:id/reviews" component={Reviews} />
                <Route exact path="/trainings/:id/review" component={ReviewForm} />
                <Route exact path="/training" component={TrainingForm} />
            </BrowserRouter>
        </div>
    );
}

export default App;
