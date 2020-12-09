import { Component, Fragment } from 'react';
import firebase from '../firebase';

class WatchList extends Component {
    constructor() {
        super();
        this.state = {
            savedRecommendations: []
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

    render() {
        return (
            <>
                {
                    this.state.savedRecommendations.map((firebaseMovie) => {
                        const primaryMovie = firebaseMovie[0];
                        const arrayOfMovies = firebaseMovie[1];
                        return (
                            arrayOfMovies.map((movie) => {
                                return (
                                    <div key={movie.id}>
                                        <h1>{movie.title}</h1>
                                    </div>
                                )
                            })
                        )
                    })
                }
            </>
        )
    }
}

export default WatchList;