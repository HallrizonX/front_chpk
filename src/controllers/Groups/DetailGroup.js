import React from 'react';
import './Groups.css';
import axios from "axios";
import {Link} from "react-router-dom";

class DetailGroup extends React.Component {
    state = {
        group: null,
        teachers: null,
        subjects: null
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        // Get detail group from API
        axios.get(`${window.API_URL}/groups/${id}/`)
            .then(res => {
                const group = res.data.data.result;
                this.setState({group});
                // Get list of teachers from API
                axios.get(`${window.API_URL}/groups/teachers/${group.number}/`)
                    .then(res => {
                        const teachers = res.data.data.result;
                        this.setState({teachers});
                    });
                axios.get(`${window.API_URL}/groups/subjects/${group.number}/`)
                    .then(res => {
                        const subjects = res.data.data.result;
                        this.setState({subjects});
                    });
            });
    }

    render() {
        console.log(this.state.group);
        console.log(this.state.teachers);
        console.log(this.state.subjects);
        return (
            <>
                <h1>Detail</h1>
                <h1>Викладачі які викладають у {this.state.group ? this.state.group.number: undefined}</h1>
                {this.state.teachers ? this.state.teachers.map(teacher =>
                    <div key={teacher.id}>
                        <Link to={`/teachers/${teacher.id}/`}>
                            <h5>ПІП: {`${teacher.profile.surname} ${teacher.profile.name} ${teacher.profile.last_name}`} </h5>

                        </Link>
                    </div>
                ) : undefined}

                <h1>Предмети які викладають у {this.state.group ? this.state.group.number: undefined}</h1>
                {this.state.subjects ? this.state.subjects.map(subject =>
                    <div key={subject.id}>
                        <Link to={`/subjects/${subject.id}/`}>
                            <h1>{subject.name}</h1>
                        </Link>
                    </div>
                ) : undefined}
            </>
        );
    }
}

export default DetailGroup;