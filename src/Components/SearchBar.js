import React, { Component } from 'react';
import LinkButton from './LinkButton.js'

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
            <form className="search">
                <input onChange={this.handleChange} value={this.state.searchQuery} type="text"/>
                <LinkButton
                    to={`/search/${this.state.searchQuery}`}
                >Search</LinkButton>
            </form>
        )
    }
}

export default SearchBar;