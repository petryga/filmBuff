import { Component } from 'react';
import firebase from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faTimes, faAngleDoubleRight);


class WatchList extends Component {
    constructor() {
        super();
        this.state = {
            savedRecommendations: [],
            sidebarOpen: false
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();
            let firebaseData = [];
            for (let prop in firebaseDataObj) {
                const movie = firebaseDataObj[prop];
                firebaseData.push(movie);
            }
            const firebaseArray = Object.values(firebaseData)
            this.setState({
                savedRecommendations: firebaseArray,
            })
        });
    }

    removeFromFirebase = () => {
        firebase.database().ref('/').remove();
    }

    toggleWatchList = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    render() {
        let sidebarClassname = this.state.sidebarOpen ? 'watchListOpen' : 'watchList';
        return (
            <>
                <ul className={sidebarClassname}>
                    <div className="toggler" tabIndex="1" onClick={this.toggleWatchList}><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
                    <h1>Watch List</h1>
                    {
                        this.state.savedRecommendations.map((firebaseMovie, index) => {
                            const primaryMovie = firebaseMovie[0];
                            {
                                return (
                                    <div key={index}>
                                        <h2>{primaryMovie.original_title}</h2>
                                    </div>
                                )
                            }
                        })
                    }
                    {
                        this.state.savedRecommendations.map((firebaseMovie) => {
                            const arrayOfMovies = firebaseMovie[1];
                            if (arrayOfMovies) {
                                return (
                                    arrayOfMovies.map((movie) => {
                                        return (
                                            <div key={movie.id}>
                                                <li>
                                                    <h2>{movie.title}</h2>
                                                </li>
                                            </div>
                                        )
                                    })
                                )
                            }
                        })
                    }
                    <button className={`removeButton ${this.state.savedRecommendations.length === 0 ? "" : "show"}`}
                        onClick={this.removeFromFirebase}><FontAwesomeIcon icon={['fas', 'times']} />
                    </button>
                </ul>
            </>
        )
    }
}

export default WatchList;