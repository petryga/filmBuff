import Axios from 'axios';
import { Component } from 'react';
import firebase from '../firebase.js';
import NewMovies from './NewMovies.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faHeart);

class Suggested extends Component {
    constructor() {
        super();
        this.state = {
            userSelection: '',
            foreignMovie: [],
        }
    }

    axiosCall = (val) => {
        Axios({
            url: `https://api.themoviedb.org/3/discover/movie/`,
            params: {
                api_key: '47f7f0a78ce3e2f1427da95247b6bc0e',
                language: val,
                with_genres: this.props.genre,
            },
        }).then((res) => {
            let reducedData = res.data.results.slice(0,6);
            this.setState({
                foreignMovie: reducedData
            })
        }).catch((errorObj) => {
            alert('error')
            //maybe display 404 later
        })
    }
    
    saveSelection = () => {
            const dbRef = firebase.database().ref();
            if (this.state.foreignMovie === []) {
                alert('Please select a language in order to save the recommendations')
            } else {
                dbRef.push([this.props.movie, this.state.foreignMovie]);
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
                <form>
                    <label htmlFor="languagesDropdown">Interested in something similar but in a different language?</label>
                    <select
                        name="languagesDropdown"
                        id="languagesDropdown"
                        onChange={this.handleInputChange}
                        value={this.state.userSelection}>
                        <option value="" disabled>Language?</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                    </select>
                    <button 
                        className="dropdown-btn"
                        onClick={this.handleSubmit}>Show me</button>
                </form>
                <button className="favourite" onClick={this.saveSelection}>
                <FontAwesomeIcon icon={['fa', 'heart']}/>
                </button>
                <NewMovies foreignMoviesProp={this.state.foreignMovie} />
            </div>
        )
    }
}

export default Suggested;