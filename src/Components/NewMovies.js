import { Component } from 'react';


class NewMovies extends Component {

    render() {
        return (
            <div className="movieResults">
                <h3>Results</h3>
                <div className="flex dropDownResult">
                    {
                        this.props.foreignMoviesProp.map((movie) => {
                            if (movie.poster_path !== null) {
                            return (
                                <div key={movie.id}
                                    className="movieDropDown">
                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                </div>
                            )
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default NewMovies;