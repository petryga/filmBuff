import Axios from 'axios';
import { Component } from 'react';
import firebase from '../firebase.js';
import NewMovies from './NewMovies.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faHeart);

class Suggested extends Component {
    constructor() {
        super();
        this.state = {
            userSelection: '',
            foreignMovie: []
        }
    }

    axiosCall = (val) => {
        let randomPage = (pageNumber) => { return (Math.floor(Math.random() * Math.floor(pageNumber))) };
        if (val) {
            Axios({
                url: `https://api.themoviedb.org/3/discover/movie`,
                params: {
                    api_key: '47f7f0a78ce3e2f1427da95247b6bc0e',
                    language: val,
                    with_genres: this.props.genre,
                    page: randomPage(100)
                },
            }).then((res) => {
                let reducedData = res.data.results.slice(0, 6);
                this.setState({
                    foreignMovie: reducedData
                })
            }).catch(() => {
                alert('error');
            })
        } else {
            alert('Please select a language')
        }
    }

    saveSelection = () => {
        const dbRef = firebase.database().ref();
        if (this.state.foreignMovie.length === 0) {
            alert('Nothing has been selected yet')
        }
        else {
            dbRef.once('value', (data) => {
                const firebaseDataObj = data.val();
                let firebaseData = [];
                for (let prop in firebaseDataObj) {
                    const movie = firebaseDataObj[prop];
                    firebaseData.push(movie);
                }
                // console.log(firebaseDataObj); - for future error handling
                dbRef.push([this.props.movie, this.state.foreignMovie])
            });
        }
    }

    handleInputChange = (e) => {
        this.setState({
            userSelection: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.axiosCall(this.state.userSelection);
    }

    render() {
        return (
            <div>
                <br />
                <form className="flex column dropDownForm">
                    <label htmlFor="languagesDropDown">Interested in something similar but in a different language?</label>
                    <div className="flex dropDownBox">
                        <select
                            name="languagesDropdown"
                            id="languagesDropdown"
                            onChange={this.handleInputChange}
                            value={this.state.userSelection}>
                            <option value="" disabled>Language?</option>
                            <option value="de">German</option>
                            <option value="es">Spanish</option>
                            <option value="it">Italian</option>
                            <option value="cn">Chinese</option>
                            <option value="ru">Russian</option>
                            <option value="jp">Japanese</option>
                        </select>
                        <button
                            className="dropDownButton"
                            onClick={this.handleSubmit}>Show me
                        </button>
                    </div>
                </form>
                <button className="favourite" onClick={this.saveSelection}>
                    <FontAwesomeIcon icon={['fa', 'heart']} />
                </button>
                <NewMovies
                    foreignMoviesProp={this.state.foreignMovie} />
            </div>
        )
    }
}

export default Suggested;