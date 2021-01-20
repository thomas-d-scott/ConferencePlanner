import React, { Component } from 'react';
import Talk from './talk';
import ScheduleData from '../schedule/scheduledata';

/**
 * Component to get talks based on session id
 */
export default class TalkSessionSearch extends Component {
    /**
     * Setting up the state and assigning default values.
     */
    constructor(props) {
        super(props);
        this.state = { 
            session: '',
            talks: [],
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
      }

      /**
       * Sets the session state to the value user selected, then fetches the talks for that session and stores in the talks state array
       */
    handleChange(e) {
        
        this.setState({session: e.target.value},  () => {

            if (this.state.session === '') {
                fetch(`/sessions/0`) 
                .then(res => res.json())
                .then(talks => this.setState({talks}, () => console.log('Talks fetched...', talks)))
            } else {
                fetch(`/sessions/${this.state.session}`)
                .then(res => res.json())
                .then(talks => this.setState({talks}, () => console.log('Talks fetched...', talks)))
            }
        });

    }

    /**
     * Adding a talk to the schedule.
     * Was complicated to do. 
     * First, checked if the talk already existed in the schedule and returned a error if it did.
     * Then if it doesnt exist, had to ensure no two talks overlapped in terms of time.
     * To do this had to set up a start and end date with the times for the selected talk
     * Then for each item in schedule, compared the times to ensure no overlap.
     * If there is overlap, the talk is not added and error shows at top of page.
     * If it did not overlap, the talk is added.
     */
    handleAdd = (talk) => {

        let exists = false;
        let overlap = false;

        ScheduleData.forEach((data) => {
            if (data.id === talk.id) {
                  exists = true;
                  this.setState({error: `The talk you selected with an ID ${talk.id} has already been added to the schedule`});
            } 
        })

        if (!exists) {

            let talkYear = '2019';            
            let talkMonth = '11';            
            let talkDay = '15';            
            let talkStart = [];
            let talkEnd = [];

            let time = talk.time;

            time = time.split('-');

            talkStart = time[0];
            talkEnd = time[1];

            let talkDateStart = new Date(talkYear, talkMonth, talkDay, talkStart.substring(0,2), talkStart.substring(3,5), 0, 0);

            let talkDateEnd = new Date(talkYear, talkMonth, talkDay, talkEnd.substring(0,2), talkEnd.substring(3,5), 0, 0);

            console.log(talkDateStart);
            console.log(talkDateEnd);

            if(ScheduleData.length === 0) {
                ScheduleData.push(talk);
            } else
            {
                ScheduleData.forEach(data => {

                    let dataYear = '2019';            
                    let dataMonth = '11';            
                    let dataDay = '15';            
                    let dataStart = [];
                    let dataEnd = [];
        
                    let dataTime = data.time;
        
                    dataTime = dataTime.split('-');
        
                    dataStart = dataTime[0];
                    dataEnd = dataTime[1];
        
                    let dataDateStart = new Date(dataYear, dataMonth, dataDay, dataStart.substring(0,2), dataStart.substring(3,5), 0, 0);
        
                    let dataDateEnd = new Date(dataYear, dataMonth, dataDay, dataEnd.substring(0,2), dataEnd.substring(3,5), 0, 0);

                    if ((talkDateStart >= dataDateStart && talkDateStart <= dataDateEnd) || (talkDateEnd >= dataDateStart && talkDateEnd <= dataDateEnd)) {
                        overlap = true;
                        this.setState({error: `The talk you selected with an ID ${talk.id} overlaps with another talk in your schedule`});
                    }
                    
                })

                if (overlap !== true) {
                    ScheduleData.push(talk);
                }

            }

        }

    }

    /** 
     * Renders the component content
     */
    render() {
        return (
            <div className="container mb-3">
                <h2 className="text-center">Search by Session</h2>
                <hr className="my-4"/>

                <div className="input-group">

                <select className="custom-select" id="searchSession" onChange={this.handleChange}>
                    <option defaultValue>Choose Session...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>

                </div>

                <hr className="my-4"/>

                <h3 className="text-center mt-3">Results</h3>
                {this.state.error !== '' ? <p className="bg-warning">{this.state.error}</p> : ''}
                <hr className="my-4"/>

                <div className="row">
                    {/* For each talk in talks array, load the Talk component */}
                    {this.state.talks.map(talk => 
                            <Talk key={talk.id} talk={talk} onAdd={this.handleAdd}/> 
                    )}

                </div>

           </div>
        )
    }
}
