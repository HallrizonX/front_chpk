import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TeacherOffice from './TeacherOffice';

class TeacherJournalModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            groups: this.props.groups
        }
    }
    openModalCurrentJourna = (e) => {
        var number = e.target.getAttribute('data-id');

        window.$('.modal').modal();
        window.$('.modal').modal('open');

        axios.get(`${window.API_URL}/journals/${number}/groups/`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                    var result = res.data.data.result;
                    window.$('#journals').html('');

                    // Remove marks, why I used jquery, because I haven't time doing clear code !!!
                    window.$('body').on('click', '.remove-mark', function (e) {
                        e.preventDefault();
                        var self = window.$(this);
                        var id = self.data('id');

                        console.log(id);
                        axios.delete(`${window.API_URL}/marks/${id}/`, {headers: {Authorization: localStorage.getItem('token')}})
                            .then(res => {
                                window.$('#mark-' + id).detach();
                                self.detach()
                            })
                    });
                    result.map(item => {
                        axios.get(`${window.DOMAIN_NAME}${item.detail_journal}`)
                            .then(res => {
                                var journal = res.data.data.result;
                                var subject = journal.subject;
                                var student = journal.student;
                                var marks = journal.marks;
                                var profile = student.profile;
                                var full_name = `${profile.surname} ${profile.name} ${profile.last_name}`;
                                console.log(marks);

                                var marksContent = "";
                                marks.map(item => {
                                    marksContent += `<span id="mark-${item.id}"><span class="green-text">${item.mark}</span> : ${item.date}
                                                      <i data-id="${item.id}" class="material-icons tiny remove-mark">delete_forever</i>  
                                                     <br></span>`
                                });

                                var content = `
                                <tr>
                                    <td>${full_name}</td>
                                    <td>${subject.name}</td>
                                    <td>${marksContent}</td>
                                   
                                </tr>`;

                                window.$('#journals').append(content)
                            });

                    })
                }
            );
    };

    componentDidMount() {
    }

    render() {
        return (
            <>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <table>
                            <thead>
                            <tr>
                                <th>П.І.П</th>
                                <th>Предмет</th>
                                <th>Оцінки</th>
                            </tr>
                            </thead>

                            <tbody id='journals' ref={(journals_list) => {
                                this.journals_list = journals_list
                            }}>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={'divider'}></div>
                <h2 className='center-align'>Журнали</h2>
                <div className={'row'}>
                    {this.state.groups ? this.state.groups.map(item =>
                        <div className="card col s4">
                            <div className="card-image waves-effect waves-block waves-light">
                                <p className="activator center-align"><i
                                    className="material-icons">assignment</i></p>
                            </div>
                            <div className="card-content">
                                        <span
                                            className="card-title activator grey-text text-darken-4">Група - {item.number}</span>
                                <a data-id={item.number} onClick={this.openModalCurrentJourna}
                                   className="waves-effect waves-light  btn modal-trigger"
                                   href="#modal1">Переглянути</a>
                            </div>

                        </div>
                    ) : undefined}
                </div>

            </>
        )
    }
}

export default TeacherJournalModal;