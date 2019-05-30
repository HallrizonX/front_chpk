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
        axios.get(`${window.API_URL}/subjects/${id}/teachers/`)
            .then(res => {
                const teachers = res.data.data.result;
                this.setState({teachers});
            });
        axios.get(`${window.API_URL}/subjects/${id}/files/`)
            .then(res => {
                const files = res.data.data.result;
                this.setState({files});
            });
    }

    render() {
        console.log(this.state.subject);
        console.log(this.state.teachers);
        console.log(this.state.files);
        if (this.state.subject && this.state.teachers && this.state.files) {
            return (
                <>
                    <div className="container">
                        <h2 className='center-align'>
                            <b>{this.state.subject ? this.state.subject.name : undefined}</b> - <b>{this.state.subject ? this.state.subject.group.number : undefined}</b>
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
                                <h5 className={'center-align col s12'}>Опис</h5>
                                {this.state.subjects ? this.state.subjects.map(subject =>
                                    <div key={subject.id}>
                                        <Link to={`/subjects/${subject.id}/`}>
                                            <h6 className=' center-align col s12'>{subject.name}</h6>
                                        </Link>
                                    </div>
                                ) : undefined}

                            </div>
                        </div>
                        <div className={'divider'}></div>
                        <h2 className='center-align'>Файли</h2>
                        <div className={'row'}>
                            <div className="collection col s8 offset-s2" style={{padding: 10}}>
                                {this.state.files.map(file =>
                                    <a download href={`${window.DOMAIN_NAME}${file.file}`} className="center-align collection-item">
                                        <b>{file.title}</b>
                                    </a>
                                )}

                            </div>
                        </div>
                    </div>

                </>
            );
        } else {
            return (<><h1>Detail Subject</h1></>)
        }
    }
}

export default DetailSubject;