import Axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Catalogue extends Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        // CHECKING FOR IF THE USER HITS HOMEPAGE ROUTE AT '/' OR SEARCH ROUTE AT '/SERACH/SEARCH-TERM'

        // if the user hits '/search/search-term/' we can access the url search param by this.props.match.param.searchQueryHere
        if (this.props.match.params.searchQueryHere) {
            this.theApiCall(this.props.match.params.searchQueryHere);
        } else {
            // make the API call without search query, this will happen when user hits homepage at '/'
            this.theApiCall();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.searchQueryHere !== this.props.match.params.searchQueryHere) {
            this.theApiCall(this.props.match.params.searchQueryHere);
        }
    }

    theApiCall = (searchQuery) => {
        let endPointWord = 'discover';
        if (searchQuery) {
            endPointWord = 'search';
        }
        Axios({
            url: `https://api.themoviedb.org/3/${endPointWord}/movie`,
            params: {
                api_key: '47f7f0a78ce3e2f1427da95247b6bc0e',
                language: 'en-US',
                page: 1,
                query: searchQuery
            }
        }).then((movies) => {
            this.setState({
                movies: movies.data.results
            })
        })
    }

    render() {
        return (
            <div className="catalogue flex">
                {
                    this.state.movies.map((movie) => {
                            if (movie.poster_path !== null) {
                                return (
                            <div className="movie" key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`Poster for ${movie.original_title}`} />
                                </Link>
                            </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default Catalogue;