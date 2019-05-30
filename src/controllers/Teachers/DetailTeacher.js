import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class DetailTeacher extends React.Component {
    state = {
        teacher: null
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        // Get detail group from API
        axios.get(`${window.API_URL}/teachers/${id}/`)
            .then(res => {
                const teacher = res.data.data.result;
                var files_list = [];

                teacher.subjects.map(subject => {
                    axios.get(`${window.DOMAIN_NAME}${subject.subject_files}`)
                        .then(res => {
                                files_list.push({
                                    'name': subject.name,
                                    'group': subject.group.number,
                                    'files': res.data.data.result
                                });
                            }
                        );
                });
                setTimeout(function () {
                    this.setState({files_list});
                }.bind(this), 700);

                this.setState({teacher});
            });
    }

    render() {

        if (this.state.teacher) {

            console.log(this.state.files_list)
            return (
                <>
                    <div className="container">
                        <h2 className='center-align'>
                            <b>{this.state.group ? this.state.group.number : undefined}</b> Викладач
                        </h2>
                        <div className={'divider'}>
                        </div>
                        <div className='row'>
                            <div className='col s6'>
                                <h5 className={'center-align col s12'}>Особисті дані</h5>
                                <p>Ім'я: {this.state.teacher.profile.name}</p>
                                <p>Прізвище: {this.state.teacher.profile.surname}</p>
                                <p>По батькові: {this.state.teacher.profile.last_name}</p>
                            </div>
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
                        </div>
                        <div className={'divider'}></div>
                        <h2 className='center-align'>Файли</h2>
                        <div className={'row'}>
                            {this.state.files_list ? this.state.files_list.map(item =>
                                <div className="card col s4">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <p className="activator center-align"><i className="material-icons">blur_on</i></p>
                                    </div>
                                    <div className="card-content">
                                            <span className="card-title activator grey-text text-darken-4">Назва - {item.name}<i
                                                className="material-icons right">more_vert</i></span>
                                        <p>Група - {item.group}</p>
                                    </div>
                                    <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4">Файли<i
                                                className="material-icons right">close</i></span>
                                        <div className="collection">
                                            { item.files.map(file =>
                                                <a className='center-align collection-item' download href={`${window.DOMAIN_NAME}${file.file}`}>
                                                    {file.title}</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : undefined}
                        </div>
                    </div>

                </>
            );
        } else {
            return (<><h1>Detail Teacher</h1></>)
        }
    }
}

export default DetailTeacher;