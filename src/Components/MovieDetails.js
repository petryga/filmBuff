//this component displays the selected movie, its details, and — if the user so chooses a specific language — a list of 6 foreign language recommendations related to the original movie selected

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
        //this axios call populates the details for the specific movie selected from catalogue, captured by props. importantly the selected movie's genre is captured once the axios call is made.
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
        //reuslts of the api call that provide information on the movie selected are stored in the movie state. the movie's genre is extrapolated from the data, and held in its own state for later.
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
        //the data is destructured here for ease of use
        const { original_title, tagline, overview, poster_path } = this.state.movie;
        return (
        //once the api call is received and state is set, the results are displayed here
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