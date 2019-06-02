import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TeacherOffice from './TeacherOffice';
import StudentOffice from './StudentOffice';


class Office extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            office: null,
        }
    }

    componentDidMount() {
        axios.get(`${window.API_URL}/office/`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                if (res.data.data) {
                    var office = undefined;
                    // Тому що різні серіалайзери для викладача і студента
                    try {
                        office = res.data.data.result.profile.access;
                    } catch (e) {
                        office = res.data.data.result.access;
                    }
                }
                this.setState({office});
            }).catch(err => {
            localStorage.removeItem('token');
            window.location.href = '/'
        });

    }

    render() {
        if (this.state.office === 'teacher') {
            return (<> <TeacherOffice/> </>);
        } else if (this.state.office === 'student') {
            return (<> <StudentOffice/> </>)
        } else {
            return (<><h1 className='center-align'>Очікуйте...</h1></>)
        }
    }
}

export default Office;