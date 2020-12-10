import { Component } from 'react';
import firebase from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faTimes);


class WatchList extends Component {
    constructor() {
        super();
        this.state = {
            savedRecommendations: [],
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

    render() {
        return (
            <>
                <ul>
                {
                    this.state.savedRecommendations.map((firebaseMovie) => {
                        const primaryMovie = firebaseMovie[0];
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
                </ul>
                    <button
                    onClick={this.removeFromFirebase}><FontAwesomeIcon icon={['fas', 'times']}/></button>
            </>
        )
    }
}

export default WatchList;