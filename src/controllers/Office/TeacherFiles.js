import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class TeacherFiles extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    componentDidMount() {
        var files_list = [];
        this.props.subjects.map(subject => {
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
    }

    render() {
        return (
            <>
                <div className={'divider'}></div>
                <h2 className='center-align'>Файли</h2>
                <div className={'row'}>
                    {this.state.files_list ? this.state.files_list.map(item =>
                        <div className="card col s4">
                            <div className="card-image waves-effect waves-block waves-light">
                                <p className="activator center-align"><i className="material-icons">blur_on</i>
                                </p>
                            </div>
                            <div className="card-content">
                                            <span
                                                className="card-title activator grey-text text-darken-4">Назва - {item.name}<i
                                                className="material-icons right">more_vert</i></span>
                                <p>Група - {item.group}</p>
                            </div>
                            <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4">Файли<i
                                                className="material-icons right">close</i></span>
                                <div className="collection">
                                    {item.files.map(file =>
                                        <a className='center-align collection-item' download
                                           href={`${window.DOMAIN_NAME}${file.file}`}>
                                            {file.title}</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : undefined}
                </div>
            </>
        )
    }
}

export default TeacherFiles;