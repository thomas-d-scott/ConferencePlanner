import React, { Component } from 'react'
import { Link } from 'react-router-dom';

/**
 * Component for the navbar.
 */
export default class Nav extends Component {
    /**
     * Sets up the state of the menu
     */
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggler = this.toggler.bind(this);
    }

    /**
     * Reverses the value of the menu state
     */
    toggler(){
        this.setState({ menu: !this.state.menu })
    }

    // Found way to get toggler working - https://stackoverflow.com/questions/52248179/how-to-use-data-toggle-collapse-in-reactjs-with-bootstrap

    /**
     * Renders the navbar 
     * Uses Link which will link to routes declared in app.js
     */
    render() {

        const show = (this.state.menu) ? "show" : "";

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-3 pb-3">

                <h1 className="navbar-brand">GCU Conference 2019</h1>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/toggleNav" aria-controls="toggleNav" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggler}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show} id="toggleNav">
                    <ul className="nav navbar-nav ml-auto">
                    
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/talkspage">
                                Talks
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sessionspage">
                                Sessions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/schedulepage">
                                Schedule
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adminpage">
                                Admin
                            </Link>
                        </li>
            
                    </ul>
                </div>

            </nav>
        )
    }
}

