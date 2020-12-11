//this component comprises the main directory of the application

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

    //component did mount acts as a mediator between kinds of directories
    componentDidMount() {
        //if the user has searched for movies in the application's search bar, the query is capturable by way of the router. this becomes accessible as a prop. 
            //whether the prop is truthy, the api call is passed with or without it
            //the if statement is the component showing results
        if (this.props.match.params.searchQueryHere) {
            this.theApiCall(this.props.match.params.searchQueryHere);
            //the else statement is the mainpage directory, before a query is passed
        } else {
            this.theApiCall();
        }
    }

    //component did update handles the error of recalling the api if a new search is attempted with the same query
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.searchQueryHere !== this.props.match.params.searchQueryHere) {
            this.theApiCall(this.props.match.params.searchQueryHere);
        }
    }

    theApiCall = (searchQuery) => {
        //our main directory API call populates the movie directory with or without query input from the user. the variable below establishes which endpoint is reached depending on whether a query has been established by the user or not. 'discover' auto-populates movies based on genre, while 'search' populates movies based on the query provided.
        let endPointWord = 'discover';
        //
        let randomPage = (pageNumber) => { return (Math.floor(Math.random() * Math.floor(pageNumber))) };
        //if the value of searchQuery is truthy, the endPointWord variable changes, thus changing the capabilities of the api depending on the needs of the user
        if (searchQuery) {
            endPointWord = 'search';
        }
        Axios({
            url: `https://api.themoviedb.org/3/${endPointWord}/movie`,
            params: {
                api_key: '47f7f0a78ce3e2f1427da95247b6bc0e',
                language: 'en-US',
                page: randomPage(100),
                query: searchQuery
            }
        //results of the api call are stored and used for display purposes in the state of Catalogue's component
        }).then((movies) => {
            this.setState({
                movies: movies.data.results
            })
        })
    }

    render() {
        //in render, we map through the information just stored in state to display the results of the call.
        return (
            <div className="catalogue flex">
                {
                    this.state.movies.map((movie) => {
                        //this condition prevents movies in the database without a corresponding poster to be excluded from results
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