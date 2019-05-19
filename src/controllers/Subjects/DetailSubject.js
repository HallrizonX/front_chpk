import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class DetailSubject extends React.Component {
    state = {
        subject: null,
        teachers: null
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        // Get detail subject from API
        axios.get(`${window.API_URL}/subjects/${id}/`)
            .then(res => {
                const subject = res.data.data.result;
                this.setState({subject});
            });
        // Get all teachers for current subject
        axios.get(`${window.API_URL}/subjects/teachers/${id}/`)
            .then(res => {
                const teachers = res.data.data.result;
                this.setState({teachers});
            });
    }

    render() {
        console.log(this.state.subject);
        console.log(this.state.teachers);
        if (this.state.subject) {
            return (
                <>
                    <h1>Detail Subject</h1>
                    <p>Предмет: {this.state.subject.name}</p>
                    <Link to={`/groups/${this.state.subject.group.id}/`}>
                        <p>Група: {this.state.subject.group.number}</p>
                    </Link>
                    <h4>Викладачі які викладають предмет</h4>
                    <ul>
                        {this.state.teachers ? this.state.teachers.map(teacher =>
                            <div key={teacher.id}>
                                <Link to={`/teachers/${teacher.id}/`}>
                                    <li>
                                        <p>{teacher.profile.surname} {teacher.profile.name} {teacher.profile.last_name}</p>
                                    </li>
                                </Link>
                            </div>
                        ) : undefined}
                    </ul>
                </>
            );
        } else {
            return (<><h1>Detail Subject</h1></>)
        }
    }
}

export default DetailSubject;