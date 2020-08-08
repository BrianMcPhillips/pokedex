import React from 'react';

import styles from './App.css';
import request from 'superagent';
//import Search from './Search.js';
import PokeList from './PokeList.js';

class SearchPage extends React.Component {
  state = {
    search: '',
    searchBy: 'pokemon',
    isLoadig: false,
    pokeState: [],
    currentPage: 1,
    totalPages: 1
  }

  componentDidMount = async () => {
    const params = new URLSearchParams(this.props.location.search);

    const searchBy = params.get('searchBy');
    const page = params.get('page');
    const search = params.get('search');

    if (searchBy && page && search) {
      await this.setState({
        searchBy: searchBy,
        currentPage: page,
        search: search,
      });
    }
    
    await this.makeRequest()
  
  }

  makeRequest = async () => {
    this.setState({ isLoading: true });
    const data = await request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?page=${this.state.currentPage}&perPage=20&${this.state.searchBy}=${this.state.search}`);
    await this.setState ({
      pokeState: data.body.results,
      totalPages: Math.ceil(data.body.count / 20),
      isLoading: false,
    })

    const params = new URLSearchParams(this.props.location.search);
    params.set('search', this.state.search);
    params.set('searchBy', this.state.searchBy);
    params.set('page', this.state.currentPage);

    this.props.history.push('?' + params.toString())
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({
      currentPage: 1
    })
    await this.makeRequest()
  }

  handleNextClick = async () => {
    await this.setState({ currentPage: Number(this.state.currentPage) + 1 })
    
    await this.makeRequest();
  }

  handlePrevClick = async () => {
    await this.setState({ currentPage: Number(this.state.currentPage) - 1 })
    
    await this.makeRequest();
  }
    
  handleDogType = (e) => {
    const type = e.target.value;
    this.setState({ filter: type })
  }

  render() {
    const { 
      isLoading, 
      pokeState,
      currentPage,
      totalPages 
  } = this.state;
    return (
      <main className="main">
        <div>
          <form onSubmit={this.handleSubmit}>
          <input onChange={(e) => this.setState({ search: e.target.value })} value={this.state.search}/>
          <select onChange={(e) => { this.setState({ searchBy: e.target.value })} } value={this.state.searchBy}>
            <option value='pokemon'>name</option>
            <option value='type'>type</option>
            <option value='attack'>attack</option>
            <option value='defense'>defense</option>
          </select>
          <button onClick={this.handleClick}>Get Pokemon</button>
          </form>
        </div>
        <div className='poke-display'>
        {
            isLoading
              ? <p className={styles.spin}></p>
              : <PokeList 
                handleNextClick={this.handleNextClick} handlePrevClick={this.handlePrevClick} 
                currentPage={currentPage}
                pokeState={pokeState}
                totalPages={totalPages} />
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