import React from 'react';

import './App.css';
import request from 'superagent';
import Search from './Search.js';
import PokeList from './PokeList.js';

class App extends React.Component {
  state = {
    search: '',
    isLoadig: false,
    pokeState: []
  }

  handleClick = async () => {
    this.setState({isLoading: true})
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?perPage=1000&pokemon=${this.state.search}`);
    
    this.setState({
      pokeState: data.body.results,
      isLoading: false,
    })
  }
  handlePokemonType = (e) => {
    const type = e.target.value;

    this.setState({ search: type })
  }

  render() {
    return (
      <main>
        <Search handleSearch={this.handlePokemonType} />
        <button onClick={this.handleClick}>Search for Pokemon</button>
        <PokeList pokemons={this.state.pokeState} />
      </main>
    )
  }
}

export default App;


