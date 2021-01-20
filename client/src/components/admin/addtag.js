import React, { Component } from 'react'

/**
 * This component will get all the information relating to adding a new tag to an id.
 */
export default class AddTag extends Component {
    /**
     * Sets up the state and default values which are used within this component.
     */
    constructor(props) {
        super(props);
        this.state = { 
            talkID: '',
            talkTag: '',
            talks: [],
            message: '',
            talk: []
        };
    }

    /**
     * Once the component is loaded, the talks will be fetched and stored in state.
     */
    componentDidMount(){
        fetch('/talks')
        .then(res => res.json())
        .then(talks => this.setState({talks}, () => console.log('Talks fetched...', talks)))
    }

    /**
     * Upon the id being changed in the DOM, it will update the state to this value.
     */
    idChange = (e) => {
        this.setState({talkID: e.target.value})
    }

    /**
     * When the user enters a new tag in the text box, the state for this is updated.
     */
    tagChange = (e) => {
        this.setState({talkTag: e.target.value})
    }

    /**
     * If the ID and tag in state is not empty, then the api will be fetched and the tag the user entered is added to the talk.
     */
    clickEvent = () => {
        
        console.log(this.state.talkTag);
        console.log(this.state.talkID);
        if (this.state.talkID !== '' && this.state.talkTag !== '') {
            fetch(`/talks/tag/${this.state.talkID}/${this.state.talkTag}`).then(res => res.json()).then(talk => this.setState({talk}, ()=> {
                this.setState({message: 'You have successfully added a new tag to this talk'})
                console.log(this.state.talk);
            }));
        }
        
    }

    /**
     * Rendering the addtag page.
     * Includes standard things like headings and input fields along with buttons.
     */
    render() {
        return (
            <div className="container mb-3 mt-3">
                <h2 className="text-center">Add Tag</h2>
                <hr className="my-4"/>
                {this.state.message !== '' ? <p className="bg-success">{this.state.message}</p> : ''}
                <div className="form-group mb-2">
                    
                    <label htmlFor="id">Select Talk ID</label>
                    <select className="custom-select" id="id" onChange={this.idChange}>
                        <option value="">Select Option</option>
                        {/* For each talk in the talks array, listing each item as a selectable option */}
                        {this.state.talks.map(talk => 
                            <option key={talk.id} value={talk.id}>{talk.id}</option>
                        )}
                    </select>

                </div>

                <div className="input-group mb-2">

                    <input type="text" name="tag" id="tag" className="form-control" placeholder='Enter New Tag Here...' onChange={this.tagChange}/>

                </div>

                <div className="input-group">

                    <button className="btn btn-block btn-info" type="submit" onClick={this.clickEvent}>Add Tag</button>

                </div>

                <hr className="my-4"/>


           </div>
        )
    }
}
