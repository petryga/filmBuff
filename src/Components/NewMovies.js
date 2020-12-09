import { Component } from 'react';


class NewMovies extends Component {

    render() {

        return (
            <div>
                {
                    this.props.foreignMoviesProp.map((movie) => {
                        return (
                            <div key={movie.id}>
                                <h1>{movie.title}</h1>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default NewMovies;