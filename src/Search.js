import React from 'react'

export default class Search extends React.Component {
    render() {
        return (
        <input onChange={this.props.handleSearch} />
           
        
        )
    }
}