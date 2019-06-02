import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TeacherJournalModal from "./TeacherJournalModal";
import TeacherFiles from './TeacherFiles';

class TeacherOffice extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {office: null,}
    }

    componentDidMount() {
        axios.get(`${window.API_URL}/office/`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                const teacher = res.data.data.result;
                const subjects = res.data.data.result.subjects;
                let groups = undefined;

                axios.get(`${window.API_URL}/teacher/groups/`, {headers: {Authorization: localStorage.getItem('token')}})
                    .then(res => {
                            groups = res.data.data.result;
                            this.setState({groups});
                        }
                    );

                this.setState({teacher});
                this.setState({groups});
                this.setState({subjects})

            }).catch(err => {
            localStorage.removeItem('token');
            window.location.href = '/'
        });
    }

    render() {
        if (this.state.teacher) {
            return (
                <>
                    <div className="container">
                        <h2 className='center-align'>
                            <b>{this.state.group ? this.state.group.number : undefined}</b> Викладач
                        </h2>
                        <div className={'divider'}></div>
                        <div className='row'>
                            {/*----------------------------- Особисті дані ------------------------------------------*/}
                            <div className='col s6'>
                                <h5 className={'center-align col s12'}>Особисті дані</h5>
                                <p>Ім'я: {this.state.teacher.profile.name}</p>
                                <p>Прізвище: {this.state.teacher.profile.surname}</p>
                                <p>По батькові: {this.state.teacher.profile.last_name}</p>
                            </div>
                            {/*-------------------- Предмети які викладає викладач ----------------------------------*/}
                            <div className='col s6' style={{borderLeft: '1px solid gray '}}>
                                <h5 className={'center-align col s12'}>Предмети</h5>
                                {this.state.teacher.subjects.map(subject =>
                                    <div key={subject.id}>
                                        <Link to={`/subjects/${subject.id}/`}>
                                            <h6 className=' center-align col s12'>{subject.name}</h6>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {/*--------------------------------------------------------------------------------------*/}
                        </div>

                        {this.state.groups ? <TeacherJournalModal groups={this.state.groups}/> : undefined}
                        {this.state.subjects ? <TeacherFiles subjects={this.state.subjects}/> : undefined}
                    </div>
                </>
            );
        } else {
            return (<><h1 className='center-align'>Очікуйте...</h1></>)
        }
    }
}

export default TeacherOffice;