import React from 'react';
import './Teachers.css';
import axios from 'axios';
import {Link} from "react-router-dom";

class Teachers extends React.Component {
    state = {
        teachers: null
    };

    componentDidMount() {
        // Get all groups from API
        axios.get(`${window.API_URL}/teachers/`)
            .then(res => {
                const teachers = res.data.data.result;
                this.setState({teachers});
            });
    }

    render() {
        console.log(this.state.teachers);
        return (
            <>
                <h1>Teachers</h1>
                {this.state.teachers ? this.state.teachers.map(teacher =>
                    <div key={teacher.id}>
                        <Link to={`/teachers/${teacher.id}/`}>
                            <h5>ПІП: {`${teacher.profile.surname} ${teacher.profile.name} ${teacher.profile.last_name}`} </h5>
                        </Link>
                            <ul>
                                {teacher.subjects.map(subject =>
                                    <li key={subject.id}>
                                        <Link to={`/subjects/${subject.id}/`}>
                                            <p>{subject.name} в {subject.group.number}</p>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                    </div>
                ) : undefined}
            </>
        );
    }
}

export default Teachers;