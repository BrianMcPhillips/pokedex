import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from 'react-router-dom';
import SearchPage from './SearchPage.js';
import DetailPage from './detailPage.js';
import styles from './App.css';

export default class App extends Component {
    render() {
        return (
          <>
          <div className={styles.Box}>
                <Router>
                    <header>
                      <li>
                        <Link to="/detail">Detail</Link>
                      </li>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                    </header>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <SearchPage {...routerProps} />} 
                        />
                        <Route 
                            path="/detail/:myPokemonId" 
                            exact
                            render={(routerProps) => <DetailPage {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
            </>
        )
    }
}