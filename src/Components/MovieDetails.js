import Axios from 'axios';
import { Component } from 'react';
import Suggested from './Suggested.js';

class MovieDetails extends Component {
    constructor() {
        super();
        this.state = {
            movie: {},
            genre: '',
        }
    }

    componentDidMount() {
        Axios({
            url: `https://api.themoviedb.org/3/movie/${this.props.match.params.movieDetails}`,
            params: {
                api_key: '47f7f0a78ce3e2f1427da95247b6bc0e',
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: '1'
            },
        }).then((res) => {
            this.setState({
                movie: res.data,
                genre: res.data.genres[0].id,
            })
        }).catch(() => {
            alert('error')
        })
    }

    render() {
        const { original_title, tagline, overview, poster_path } = this.state.movie;
        return (
            <div className="posterAll flex wrapper">
                <div className="image flex column">
                    <div className="image">
                        <img src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt={`poster for ${poster_path}`} />
                    </div>
                </div>
                <div className="textContent flex column">
                    <h2>{original_title}</h2>
                    <h3>{tagline}</h3>
                    <p>{overview}</p>
                    <Suggested
                    genre={this.state.genre}
                    movie={this.state.movie}
                    />
                </div>
            </div>
        )
    }
}

export default MovieDetails;