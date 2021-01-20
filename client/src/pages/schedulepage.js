import React, { Component } from 'react';
import ScheduleData from '../components/schedule/scheduledata';

/**
 * Component to get personal schedule
 */
class SchedulePage extends Component {

    // Sets up state with default value
    state = {
        clear: false,
        removed: false,
        saved: false,
        sessions: []
    }

    // Loads sessions.
    // If there is data in local storage, will load this in and add to schedule data array only if its not already in there.
    componentDidMount() {
        fetch('/sessions')
        .then(res => res.json())
        .then(sess => this.setState({sessions: sess}));

        if (localStorage.length !== 0) {
            let data = localStorage.getItem("schedule");
            let dataSet = JSON.parse(data);

            dataSet.forEach(data => {

                let exists = false

                ScheduleData.forEach((d) => {
                    if (d.id === data.id) {
                        exists = true;
                    } 
                });

                if (exists === false) {
                    ScheduleData.push(data);
                }

            });
        } 
        
        this.saveToLocal();
    }

    //
    clearSchedule = () => {
        ScheduleData.length = 0;
        this.deleteFromLocal();
        this.setState({clear: !this.state.clear});
    }

    // Saves schedule to local storage
    saveToLocal = () => {
        localStorage.setItem("schedule", JSON.stringify(ScheduleData));
        this.setState({saved: !this.state.saved});
    }

    // Deletes schedule from local storage
    deleteFromLocal = () => {
        localStorage.removeItem("schedule");
    }

    // Removes talk from schedule data
    // Creates temp array, adds all except selected talk, clears actual array then pushes each item in the temp array back onto schedule data array
    removeItem = (talk) => {

        const items = ScheduleData.filter(item => item.id !== talk)
        

        ScheduleData.length = 0;

        items.forEach(item => {
            ScheduleData.push(item);
        })

        this.saveToLocal();

    }

    // Gets the location for the provided talk - called in the for loop to add rows to table
    getLocation = (talk) => {

        let location = '';

        this.state.sessions.forEach(element => {
            if (element.id === talk.session) {
                location = element.location;
            }
        });

        return location;
        
    }

    // Renders the schedule component
    render(){
        return (
            <div className="container text-center">

            <h1 className="text-center mt-3">Personalised Schedule</h1>
            <p className="lead">This page shows the items you have added to your personalised schedule. Your schedule should remain everytime you visit the page until you either delete an individual item or click the red clear button below.</p>

            <hr className="my-4" />

            <div className="row d-flex text-center">
                <div className="col-12 justify-content-center">
                    <button className="btn btn-block btn-danger mb-2" type="submit" onClick={this.clearSchedule}>Clear Entire Schedule</button>
                </div>
            </div>

            <hr className="my-4" />

            <table className="table table-dark table-striped text-center table-responsive">

                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Title</th>
                        <th>Speaker</th>
                        <th>Delete Item</th>
                    </tr>
                </thead>

                <tbody>
                    {/* For each item in schedule data, add row to table */}
                    {ScheduleData.map((talk) => {

                        return (
                            <tr key={talk.id}>
                                <td>{talk.time}</td>
                                <td>{(this.getLocation(talk))}</td>
                                <td>{talk.title}</td>
                                <td>{talk.speaker}</td>
                                <td><button type="submit" className="btn btn-danger" onClick={() => this.removeItem(talk.id)}>X</button></td>
                            </tr>
                        )

                    })}

                </tbody>

            </table>

            </div>
        )
    }
}

export default SchedulePage;