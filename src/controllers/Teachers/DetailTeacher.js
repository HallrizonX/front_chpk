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
                this.setState({teacher});
            });
    }

    render() {
        console.log(this.state.teacher);
        if (this.state.teacher) {
            return (
                <>
                    <h1>Detail Teacher</h1>
                    <p>Ім'я: {this.state.teacher.profile.name}</p>
                    <p>Прізвище: {this.state.teacher.profile.surname}</p>
                    <p>По батькові: {this.state.teacher.profile.last_name}</p>

                    <h4>Предмети</h4>
                    <ul>
                        {this.state.teacher.subjects.map(subject =>
                            <li key={subject.id}>
                                <Link to={`/subjects/${subject.id}/`}>
                                    <p>{subject.name} в {subject.group.number}</p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </>
            );
        } else {
            return (<><h1>Detail Teacher</h1></>)
        }
    }
}

export default DetailTeacher;