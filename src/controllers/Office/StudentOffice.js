import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class StudentOffice extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            list_journals: []
        }
    }


    componentDidMount() {
        axios.get(`${window.API_URL}/office/`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                const student = res.data.data.result;

                axios.get(`${window.API_URL}/student/journals/`, {headers: {Authorization: localStorage.getItem('token')}})
                    .then(res => {
                        res = res.data.data.result;
                        res.map(item => {
                            axios.get(`${window.DOMAIN_NAME}${item.detail_journal}`, {headers: {Authorization: localStorage.getItem('token')}})
                                .then(res => {
                                    res = res.data.data.result;
                                    console.log(res)
                                    this.setState({
                                        list_journals: [...this.state.list_journals, res]
                                    });
                                })
                        });
                    });

                this.setState({student})
            }).catch(err => {
            localStorage.removeItem('token');
            window.location.href = '/'
        });
    }

    openModalCurrentJournal = (e) => {
        e.preventDefault();
        var id = e.target.getAttribute('data-id');
        window.$('.modal-marks').modal();
        window.$('.modal-marks').modal('open');

        axios.get(`${window.API_URL}/journals/${id}/`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(async res => {
                var marks = res.data.data.result.marks;
                var subjectName = res.data.data.result.subject.name;
                var subjectTeachers = res.data.data.result.subject.subject_teachers;
                var teachers = await axios.get(`${window.DOMAIN_NAME}${subjectTeachers}`, {headers: {Authorization: localStorage.getItem('token')}});
                var teacherText = "";
                teachers.data.data.result.map(item=>{
                    teacherText += `<span>${item.profile.surname} ${item.profile.name} ${item.profile.last_name}</span><br>`;
                });
                window.$("#teachers-list").html(teacherText);
                window.$('#journals').html('');
                marks.map(mark => {
                    window.$('#journals').append(`<tr>
                                    <th>${subjectName}</th>
                                    <th>${mark.mark}</th>
                                    <th>${mark.date}</th>
                                </tr>`);
                });
            })

    };

    render() {
        if (this.state.student) {
            return (
                <>
                    <div id="modal2" className="modal modal-marks">
                        <div className="modal-content">
                            <table>
                                <thead>
                                <tr>
                                    <th id='teachers-list'>Предмет</th>
                                    <th>Оцінкa</th>
                                    <th>Дата</th>
                                </tr>
                                </thead>

                                <tbody id='journals'></tbody>
                            </table>
                        </div>
                    </div>

                    <div className="container">
                        <h2 className='center-align'>
                            Студент
                        </h2>
                        <div className={'divider'}></div>
                        <div className='row'>
                            {/*----------------------------- Особисті дані ------------------------------------------*/}
                            <div className='col s6'>
                                <h5 className={'center-align col s12'}>Особисті дані</h5>
                                <p>Ім'я: {this.state.student.name}</p>
                                <p>Прізвище: {this.state.student.surname}</p>
                                <p>По батькові: {this.state.student.last_name}</p>
                            </div>
                            <div className='col s6' style={{borderLeft: '1px solid gray '}}>
                                <h5 className={'center-align col s12'}>Предмети</h5>
                            </div>
                        </div>

                        <div id="modal1" className="modal">
                            <div className="modal-content">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Предмет</th>
                                        <th>Оцінка</th>
                                        <th>Дата</th>
                                    </tr>
                                    </thead>
                                    <tbody id='journals'></tbody>
                                </table>
                            </div>
                        </div>

                        <div className={'divider'}></div>
                        <h2 className='center-align'>Журнали</h2>
                        <div className={'row'}>
                            {this.state.list_journals ? this.state.list_journals.map(item =>
                                <div className="card col s6" key={item.id}>
                                    <div className="card-image waves-effect waves-block waves-light">

                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">
                                            <b>{item.subject.group.number} - {item.subject.name}</b>
                                            <i className="material-icons right">more_vert</i></span>
                                        <p><a data-id={item.id} onClick={this.openModalCurrentJournal}
                                              href="#modal2">Оцінки</a></p>
                                    </div>

                                </div>
                            ) : undefined}
                        </div>


                    </div>
                </>
            );
        } else {
            return (<></>)
        }
    }
}

export default StudentOffice;