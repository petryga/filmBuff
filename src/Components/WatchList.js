//this component comprises the functionality that stores and displays saved recommendations to users in a toggleable menu

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

    //listens for updating data in firebase
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

    //removes all input in firebase
    //for future, we'd like to resolve
    removeFromFirebase = () => {
        firebase.database().ref('/').remove();
    }

    //handles the state of the open side bar, becomes the opposite boolean value on click
    toggleWatchList = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        })
    }

    render() {
        //these variables change depending on the state of the open sidebar
        let sidebarClassname = this.state.sidebarOpen ? 'watchListOpen' : 'watchList';
        let togglerClassname = this.state.sidebarOpen ? 'togglerOpen' : 'toggler';
        let removeButtonClassname = this.state.sidebarOpen ? 'removeButtonOpen' : 'removeButton';
        if (this.state.savedRecommendations.length !== 0){
            //the original movie and the saved recommendations are mapped through and displayed in tandem
            return (
                <>
                    <ul className={sidebarClassname}>
                        <div className={togglerClassname} tabIndex="1" onClick={this.toggleWatchList} onKeyDown={this.toggleWatchList}><FontAwesomeIcon icon={faAngleDoubleRight} aria-label="Open the recommendations list"/></div>
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
                        <button className={`${removeButtonClassname} ${this.state.savedRecommendations.length === 0 ? "" : "show"}`} onClick={this.removeFromFirebase}>
                            <FontAwesomeIcon icon={faTrash} aria-label="Delete all recommendations"/>
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