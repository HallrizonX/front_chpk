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
                axios.get(`${window.API_URL}/groups/${group.number}/teachers/`)
                    .then(res => {
                        const teachers = res.data.data.result;
                        this.setState({teachers});
                    });
                axios.get(`${window.API_URL}/groups/${group.number}/subjects/`)
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
                <div className="container">
                    <h2 className='center-align'><b>{this.state.group ? this.state.group.number : undefined}</b> група
                    </h2>
                    <div className={'divider'}>
                    </div>
                    <div className='row'>
                        <div className='col s6'>
                            <h5 className={'center-align col s12'}>Викладачі</h5>
                            {this.state.teachers ? this.state.teachers.map(teacher =>
                                <div key={teacher.id}>
                                    <Link to={`/teachers/${teacher.id}/`}>
                                        <h6 className=' center-align col s12'>{`${teacher.profile.surname} ${teacher.profile.name} ${teacher.profile.last_name}`} </h6>
                                    </Link>
                                </div>
                            ) : undefined}
                        </div>
                        <div className='col s6' style={{borderLeft: '1px solid gray '}}>
                            <h5 className={'center-align col s12'}>Предмети</h5>
                            {this.state.subjects ? this.state.subjects.map(subject =>
                                <div key={subject.id}>
                                    <Link to={`/subjects/${subject.id}/`}>
                                        <h6 className=' center-align col s12'>{subject.name}</h6>
                                    </Link>
                                </div>
                            ) : undefined}

                        </div>
                    </div>
                    <div className={'divider'}> </div>
                </div>
            </>
        );
    }
}

export default DetailGroup;