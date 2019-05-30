import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Progress from '../Includes/Progress'

class Subjects extends React.Component {
    state = {
        subjects: null
    };

    componentDidMount() {
        // Get all groups from API
        axios.get(`${window.API_URL}/subjects/`)
            .then(res => {
                const subjects = res.data.data.result;
                this.setState({subjects});
            });
    }

    render() {
        console.log(this.state.subjects);
        if (this.state.subjects) {
            return (
                <>
                    <div className="container">
                        <h2 className='center-align'>Предмети</h2>
                        <div className='row'>
                            {this.state.subjects ? this.state.subjects.map(subject =>
                                <Link to={`/subjects/${subject.id}/`}>
                                    <div className='collapsible col s3 offset-s1'>
                                        <div className="collapsible-header"><i className="material-icons">class</i>
                                            <b>{subject.name} : {subject.group.number}</b>
                                        </div>
                                    </div>
                                </Link>
                            ) : undefined}
                        </div>
                    </div>
                </>
            );
        }else{
            return (<Progress/>)
        }
    }
}

export default Subjects;