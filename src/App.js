import { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Catalogue from './Components/Catalogue.js';
import MovieDetails from './Components/MovieDetails.js'
import SearchBar from './Components/SearchBar.js';
import WatchList from './Components/WatchList.js';

import SearchError from './Components/SearchError.js';

 //Some code was inspired by the codealong we did with Safi

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header>
          <Link to="/"><h1>MOVIES</h1></Link>
            <SearchBar search={this.handleSearchCall} />
            <WatchList />
          </header>
            <Route exact path="/" component={Catalogue} />
            <Route path="/search/:searchQueryHere" component={Catalogue} />
            <Route path="/movie/:movieDetails" component={MovieDetails} />

            <Route path="/search/:?" component={SearchError} />
          </div>
      </Router>
    )
  }
}
export default App;
