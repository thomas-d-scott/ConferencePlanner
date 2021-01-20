import React, { Component } from 'react';
import Session from '../components/session';

/**
 * Page to show all sessions
 */
class SessionsPage extends Component {

    // Sets up session state to store sessions.
    constructor(){
        super();
        this.state = {
            sessions: []
        }
    }

    // Fetches sessions and stores in sessions state
    componentDidMount(){
        fetch('/sessions')
        .then(res => res.json())
        .then(sessions => this.setState({sessions}, () => console.log('Sessions fetched...', sessions)))
    }
    
    // Renders component and the data for eahc component
    render(){
        return (
            <div className="container text-center">

                <h1 className="text-center mt-3">Sessions</h1>
                <p className="lead">Below are the details for each available session...</p>
                <hr className="my-4"/>

                <div className="row">
                {/* Calls Session component for each session in sessions array */}
                {this.state.sessions.map(sessions => 
                    <Session key={sessions.id} id={sessions.id} title={sessions.title} location={sessions.location}/> 
                )}

                </div>


            </div>
        )
    }
}

export default SessionsPage;