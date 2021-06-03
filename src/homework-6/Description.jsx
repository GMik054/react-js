import React, { Component } from 'react';

class Description extends Component {

    render() {
        const { value } = this.props

        return (
            <span>{value}</span>
        )
    }
}
export default Description;