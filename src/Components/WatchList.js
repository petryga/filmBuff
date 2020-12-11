import { Component } from 'react';
import firebase from '../firebase';
import { faAngleDoubleRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        let togglerClassname = this.state.sidebarOpen ? 'togglerOpen' : 'toggler';
        let removeButtonClassname = this.state.sidebarOpen ? 'removeButtonOpen' : 'removeButton';
        if (this.state.savedRecommendations.length !== 0){
            return (
                <>
                    <ul className={sidebarClassname}>
                        <div className={togglerClassname} tabIndex="1" onClick={this.toggleWatchList}><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
                        <h2>Because you liked:</h2>
                        {
                            this.state.savedRecommendations.map((firebaseMovie, index) => {
                                const primaryMovie = firebaseMovie[0];
                                {
                                    return (
                                        <div key={index}>
                                            <h3>{primaryMovie.original_title}</h3>
                                        </div>
                                    )
                                }
                            })
                        }
                        <h2>You should watch:</h2>
                        {
                            this.state.savedRecommendations.map((firebaseMovie) => {
                                const arrayOfMovies = firebaseMovie[1];
                                if (arrayOfMovies) {
                                    return (
                                        arrayOfMovies.map((movie) => {
                                            return (
                                                <div key={movie.id}>
                                                    <li>
                                                        <h3>{movie.title}</h3>
                                                    </li>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            })
                        }
                        <button className={`${removeButtonClassname} ${this.state.savedRecommendations.length === 0 ? "" : "show"}`}
                            onClick={this.removeFromFirebase}><FontAwesomeIcon icon={faTrash} />
                        </button>
                    </ul>
                </>
            )
    } else {
            return (
                <ul className="watchList">
                    <p>Nothing to see here</p>
                </ul>
            )
        }
    }
}

export default WatchList;