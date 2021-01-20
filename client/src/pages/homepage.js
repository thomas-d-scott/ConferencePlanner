import React, { Component } from 'react';

/**
 * Component to load home page
 */
class Homepage extends Component {

    render(){
        return (
            <div className="container">

            <h1 className="text-center mt-3">Welcome</h1>

            <hr className="my-4"/>

            <p className="lead text-center">This application is used to view talks at the GCU Conference 2019. Browse and rate our selection of talks, and add the ones you're interested in to your personalised schedule!</p>

            </div>
        )
    }
}

export default Homepage;