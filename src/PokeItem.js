import React from 'react';

class PokeItem extends React.Component {
    render() {
    return (<li>
                <img src={this.props.pokemon.url_image} alt={this.props.pokemon.pokemon}/>
                <h3>{this.props.pokemon.pokemon}</h3>
            </li>)
    }
  }

  export default PokeItem;