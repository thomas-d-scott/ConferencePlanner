import React, { Component } from 'react'

/**
 * Component to display info for each session. Used props to get data from the component that calls it.
 */
export default class Session extends Component {
    render() {

        return (
            <div className="col-sm-12 col-md-4 d-flex">

                <div className="card flex-fill mb-3">

                    <div className="card-body">

                        <h5 className="card-title">Session: {this.props.id}</h5>

                        <hr className="my-4"/>

                        <p className="card-text"><b>Title</b>: {this.props.title}</p>
                        <p className="card-text"><b>Location</b>: {this.props.location}</p>

                    </div>

                </div>

            </div>
        )

    }
}