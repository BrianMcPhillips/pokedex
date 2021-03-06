import React from 'react';
import PokeItem from './PokeItem'

class PokeList extends React.Component {
    render() {
      return (
         <div>
            <ul>
            {this.props.pokemons.map((pokemon) => <PokeItem pokemon={pokemon} />)
            }
          </ul>
      </div>
      )
    }
  }

  export default PokeList;