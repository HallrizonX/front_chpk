import React from 'react';
import './Groups.css';
import axios from 'axios';
import {Link} from "react-router-dom";

class Groups extends React.Component {
    state = {
        groups: null
    };

    componentDidMount() {
        // Get all groups from API
        axios.get(`${window.API_URL}/groups/`)
            .then(res => {
                const groups = res.data.data.result;
                this.setState({groups});
            });
    }

    render() {
        console.log(this.state.groups);
        return (
            <>
                <div className="container">

                    <h2 className='center-align'>Групи</h2>
                    <div className='row'>
                        {this.state.groups ? this.state.groups.map(group =>

                            <Link to={`/groups/${group.id}/`}>
                                <div className='collapsible col s3 offset-s1'>
                                    <div className="collapsible-header"><i className="material-icons">chrome_reader_mode</i>
                                        <b>{group.number}</b>
                                    </div>
                                </div>
                            </Link>
                        ) : undefined}
                    </div>
                </div>
            </>
        );
    }
}

export default Groups;