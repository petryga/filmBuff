import { Component } from 'react';


class NewMovies extends Component {

    render() {

        return (
            <div>
                {
                    this.props.foreignMoviesProp.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <h2>{movie.title}</h2>
                                {/* <p>{movie.vote_average}</p>
                                <img src={movie.poster_path} alt={movie.title}/> */}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default NewMovies;