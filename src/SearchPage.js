import React from 'react';

import styles from './App.css';
import request from 'superagent';
//import Search from './Search.js';
import PokeItem from './PokeItem.js';

class SearchPage extends React.Component {
  state = {
    search: '',
    searchBy: 'pokemon',
    isLoadig: false,
    pokeState: []
  }

  handleClick = async () => {
    this.setState({isLoading: true})
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&${this.state.searchBy}=${this.state.search}`);
    
    this.setState({
      pokeState: data.body.results,
      isLoading: false,
    })
    console.log("hello ladies");
  }
  handlePokemonType = (e) => {
    const type = e.target.value;

    this.setState({ filter: type })
  }

  render() {
    const { isLoading, pokeState } = this.state;
    return (
      <main className="main">
        <div>
          <input onChange={(e) => this.setState({ search: e.target.value })} />
          <select onChange={(e) => { this.setState({ searchBy: e.target.value })} }>
            <option value='pokemon'>name</option>
            <option value='type'>type</option>
            <option value='attack'>attack</option>
            <option value='defense'>defense</option>
          </select>
          <button onClick={this.handleClick}>Get Pokemon</button>
            
        </div>
        <div className='poke-display'>
        {
            isLoading
              ? <p className={styles.spin}></p>
              : pokeState.map(poke => <PokeItem key={poke.id} pokemon={poke} />)
            }
        </div>
        </main>
    );
  }
}

export default SearchPage;



      /*<main>
        <Search handleSearch={this.handlePokemonType} />
        <button onClick={this.handleClick}>Search for Pokemon</button>
        <PokeList pokemons={this.state.pokeState} />
      </main> */