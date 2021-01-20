import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

/**
 * Component to display talk info and average rating, as well as button to add to schedule and star to add rating
 * Uses props to get talk data from the component that calls it
 */
export default class Talk extends Component {

    /**
     * Setting up initial state for the component.
     */
    state = {
        rating: 0,
        yourRating: 0,
        talk: [],
        success: ''
    }

    /**
     * Once the page is loaded, the average for the talk is loaded.
     */
    componentDidMount() {
        this.getAverage();
    }

    /**
     * Gets the average rating for the talk.
     * sums the values of the ratings array, then divides this sum by the length of the array
     */
    getAverage = () => {
        let average = 0;

        if (this.props.talk.ratings.length === 0) {
            this.setState({rating: average});
        } else {
            let sum = 0;
            let length = this.props.talk.ratings.length;

            this.props.talk.ratings.forEach(element => {
                sum = sum + parseInt(element);
            });

            average = sum / length;
            this.setState({rating: average});           
        }
    }

    /**
     * User selects the talks rating using the imported star component
     * The state is set to the value of the star, then the rating is added to the talks ratings array
     */
    onStarClick(nextValue, prevValue, name) {
        this.setState({yourRating: nextValue}, () => {
            fetch(`/talks/rate/${this.props.talk.id}/${this.state.yourRating}`).then(res => res.json()).then(talk => this.setState({talk}, ()=> {
                this.setState({success: 'You have successfully added a rating to this talk. Next time you visit this page the average will be updated'})
                console.log(this.state.talk.ratings);
            }));
        });
    }

    /**
     * Renders the Talk component content
     */
    render() {

        return (
            <div className="col-sm-12 col-md-6 d-flex">

                <div className="card flex-fill mb-3">

                    <div className="card-body">

                        <h5 className="card-title">Talk ID: {this.props.talk.id}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">By: {this.props.talk.speaker}</h6>

                        <hr className="my-4"/>

                        <p className="card-text"><b>Title</b>: {this.props.talk.title}</p>
                        <p className="card-text"><b>Description</b>: {this.props.talk.description}</p>
                        <p className="card-text"><b>Session</b>: {this.props.talk.session}</p>
                        <p className="card-text"><b>Time</b>: {this.props.talk.time}</p>

                        <p className="card-text mb-2 pb-0"><b>Average Rating</b>: </p>

                        <div className="card-text mb-3 d-flex justify-content-center"><StarRatings name="averageRating" rating={this.state.rating} starDimension="25px" numberOfStars={5} starRatedColor="gold" starEmptyColor="dark-gray" starSpacing="10px"/></div>

                        <p className="card-text mb-2 pb-0"><b>Add Your Rating</b>: </p>

                        <div className="card-text mb-3 d-flex justify-content-center"><StarRatings rating={this.state.yourRating} changeRating={this.onStarClick.bind(this)} name='rating' starDimension="25px" numberOfStars={5} starRatedColor="gold" starEmptyColor="dark-gray" starHoverColor="gray" starSpacing="10px" /></div>

                        {this.state.success !== '' ? <p className="bg-success">{this.state.success}</p> : ''}

                        <button type="submit" className="btn btn-primary btn-block" onClick={() => this.props.onAdd(this.props.talk)}>Add to Schedule</button>

                    </div>

                </div>

            </div>
        )

    }
}
