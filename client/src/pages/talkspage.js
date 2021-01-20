import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AllTalks from '../components/talks/alltalks';
import TalkTagSearch from '../components/talks/talktagsearch';
import TalkSpeakerSearch from '../components/talks/talkspeakersearch';
import TalkSessionSearch from '../components/talks/talksessionsearch';
import TalkIDSearch from '../components/talks/talkidsearch';
import TalkDescriptionSearch from '../components/talks/talksdescriptionsearch';

/**
 * Calls the talks page and the buttons which are available for user to select
 * Defines routes which are accessed when user clicks button
 */
class TalksPage extends Component {
    
    render(){
        return (
            <div className="container text-center">

                <h1 className="text-center mt-3">Talks</h1>
                <p className="lead">Welcome! Please select an option below to start finding talks!</p>
                <hr className="my-4"/>

                <div className="row text-center">
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                        <Link to="/talkspage/alltalks"><button className="btn btn-lg btn-info mr-3 btn-block">View All Talks</button></Link>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                        <Link to="/talkspage/talkidsearch"><button className="btn btn-lg btn-success mr-3 btn-block">Search by Talk ID</button></Link>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                        <Link to="/talkspage/talkspeakersearch"><button className="btn btn-lg btn-danger mr-3 btn-block">Search by Speaker</button></Link>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                         <Link to="/talkspage/talksessionsearch"><button className="btn btn-lg btn-secondary mr-3 btn-block">Search by Session</button></Link>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                        <Link to="/talkspage/talktagsearch"><button className="btn btn-lg btn-warning mr-3 btn-block">Search by Tag</button></Link>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">

                        <Link to="/talkspage/talkdescriptionsearch"><button className="btn btn-lg btn-dark mr-3 btn-block">Search by Description</button></Link>

                    </div>
                </div>

                <hr className="my-4"/>

                <Route path={'/talkspage/alltalks'} component={AllTalks}/>

                <Route path={'/talkspage/talkidsearch'} component={TalkIDSearch}/>

                <Route path={'/talkspage/talkspeakersearch'} component={TalkSpeakerSearch}/>

                <Route path={'/talkspage/talksessionsearch'} component={TalkSessionSearch}/>

                <Route path={'/talkspage/talktagsearch'} component={TalkTagSearch}/>

                <Route path={'/talkspage/talkdescriptionsearch'} component={TalkDescriptionSearch}/>

            </div>
        )
    }
}

export default TalksPage;