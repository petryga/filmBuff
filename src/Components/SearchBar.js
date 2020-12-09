import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchQuery: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    render() {
        return (
            <form className="searchinShit">
                <input onChange={this.handleChange} value={this.state.searchQuery} type="text" />
                {/* The illusion that the search button will actually be a link visiting /search/search-term, which will take you to render <Catalogue /> */}
                <Link to={`/search/${this.state.searchQuery}`}>Search!</Link>
            </form>
        )
    }
}

export default SearchBar;