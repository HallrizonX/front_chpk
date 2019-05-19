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
                <h1>Groups</h1>

                {this.state.groups ? this.state.groups.map(group =>
                    <div key={group.id}>
                        <Link to={`/groups/${group.id}/`}>
                            <li>{group.number}</li>
                        </Link>
                    </div>
                ) : undefined}
            </>
        );
    }
}

export default Groups;