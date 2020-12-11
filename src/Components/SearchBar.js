import React, { Component } from 'react';
import LinkButton from './LinkButton.js'

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            searchQuery: '',
            inputError: true,
        }
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value,
            inputError: false,
        })
    }

    handleAdd = () => {
        if (this.state.searchQuery === '') {
            this.setState({
                inputError: true,
            })
        }
    }

    render() {
        return (
            <form className="search flex searchButtonBox">
                <label htmlFor="search" 
                className="srOnly">
                    Search
                </label>
                <input
                    onChange={this.handleChange}
                    value={this.state.searchQuery}
                    type="text" 
                    id="search"
                    placeholder="search"/>
                <LinkButton
                    buttonError={this.state.inputError}
                    onClick={this.handleAdd}
                    to={`/search/${this.state.searchQuery}`}>Search</LinkButton>
            </form>
        )
    }
}

export default SearchBar;