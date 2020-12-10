import { Component } from 'react';


class NewMovies extends Component {

    render() {

        return (
            <div>
                <h3>RESULTS</h3>
                <div className="flex dropDownResult">
                    {
                        this.props.foreignMoviesProp.map((movie) => {
                            return (
                                <div key={movie.id}
                                    className="movieDropDown">
                                    {/* <h2>{movie.title}</h2>
                                    <p>{movie.vote_average}</p> */}
                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                </div>
                            )
                        })
                    }
                </div>
                </div>
        )
    }
}

export default NewMovies;