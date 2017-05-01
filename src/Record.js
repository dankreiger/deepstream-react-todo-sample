import React, {Component} from 'react';

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: ''
        };


        // Receive record from parent component
        // <Record record={this.client.record}></Record>
        this.record = this.props.record;
        // Bind handleChange method to the right 'this'
        this.handleChange = this.handleChange.bind(this);

        this.record.subscribe(value => {
            // Update state on input change
            this.setState({firstname: value.firstname});
            this.setState({lastname: value.lastname});
        });
    }

    handleChange(e) {
        // Handle change and update state
        // based on the values change.
        if(e.target.id === 'firstname') {
            // When 'firstname' changes
            this.setState({firstname: e.target.value});
            this.record.set('firstname', e.target.value);
        } else if(e.target.id === 'lastname') {
            // When 'lastname' changes
            this.setState({lastname: e.target.value});
            this.record.set('lastname', e.target.value);
        }
    }

    render() {
        return(
            <div className="group realtimedb">
                <h2>Realtime Datastore</h2>
                <div className="input-group half left">
                    <label>Firstname</label>
                    <input type="text" value={this.state.firstname} onChange={this.handleChange} id="firstname"/>
                </div>
                <div className="input-group half">
                    <label>Lastname</label>
                    <input type="text" value={this.state.lastname} onChange={this.handleChange} id="lastname"/>
                </div>
            </div>
        );
    }
}

export default Record;
