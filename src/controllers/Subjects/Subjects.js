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
                    <h1>Subjects</h1>
                    {this.state.subjects ? this.state.subjects.map(subject =>
                        <div key={subject.id}>
                            <Link to={`/subjects/${subject.id}/`}>
                                <h3>{subject.name} : {subject.group.number}</h3>
                            </Link>

                        </div>
                    ) : undefined}
                </>
            );
        }else{
            return (<Progress/>)
        }
    }
}

export default Subjects;