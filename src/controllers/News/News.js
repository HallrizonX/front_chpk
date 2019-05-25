import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './News.css';

class News extends React.Component {
    state = {
        news: null
    };

    componentDidMount() {
        axios.get(`${window.API_URL}/news/`)
            .then(res => {
                const news = res.data.data.result;
                this.setState({news});
            });
    }

    render() {
        console.log(this.state.news);
        return (
            <>
                <div className="container">
                    <h2 className='center-align'>Новини</h2>
                    <div className="row">
                        {this.state.news ? this.state.news.map(article =>
                            <div key={article.id} className="col s12 m4">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={`${window.DOMAIN_NAME}${article.preview_image}`}/>
                                        <span className="card-title news-title"
                                              style={{padding: '10px'}}>{article.title}</span>
                                        <Link to={`/news/${article.id}/`}>
                                            <span className="btn-floating halfway-fab waves-effect waves-light red"><i
                                                className="material-icons">keyboard_arrow_right</i></span>
                                        </Link>
                                    </div>
                                    <div className="card-content">
                                        <p>{article.short_description}</p>
                                    </div>
                                </div>
                            </div>
                        ) : undefined}
                    </div>
                </div>
            </>
        );
    }
}

export default News;