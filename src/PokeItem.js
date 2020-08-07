import React from 'react';
import { Link } from 'react-router-dom';
import styles from './App.css';

class PokeItem extends React.Component {
    render() {
      const {
        pokemon: {
          pokemon,
          url_image,
        }
      } = this.props;
    return <Link to ={`/detail/${pokemon}`}>
      <p className={styles.Box}>{pokemon}</p>
      <img className="poke-image" src={url_image} alt={pokemon} />
    </Link>
    }
  }

  export default PokeItem;