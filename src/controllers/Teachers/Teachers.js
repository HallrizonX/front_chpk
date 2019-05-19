import React from 'react';
import './Teachers.css';
import axios from 'axios';
import {Link} from "react-router-dom";

class Teachers extends React.Component {
    state = {
        teachers: null
    };

    componentDidMount() {
        // Get all groups from API
        axios.get(`${window.API_URL}/teachers/`)
            .then(res => {
                const teachers = res.data.data.result;
                this.setState({teachers});
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.$('.collapsible').collapsible();
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        console.log(this.state.teachers);
        return (
            <>
                <div className="container">

                    <h2 className='center-align'>Викладачи</h2>

                    {this.state.teachers ? this.state.teachers.map(teacher =>
                        <div className='row'>
                            <ul className="collapsible col s6">
                                <li>
                                    <div className="collapsible-header"><i className="material-icons">arrow_downward</i>Предмети

                                    </div>
                                    <div className="collapsible-body">
                                        <div className="collection">
                                            {teacher.subjects.map(subject =>
                                                <Link className={"collection-item"} to={`/subjects/${subject.id}/`}>
                                                    {`${subject.group.number}: ${subject.name}`}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className='collapsible col s6'>
                                <Link to={`/teachers/${teacher.id}/`}>
                                    <div className="collapsible-header"><i className="material-icons">account_box</i>
                                        <b>{`${teacher.profile.surname} ${teacher.profile.name} ${teacher.profile.last_name}`}</b>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : undefined}

                </div>
            </>
        );
    }
}

export default Teachers;