import React, { Component } from 'react';

class Name extends Component {
    render() {
        const { value } = this.props

        return (
            <span>{value}</span>
        )
    }
}
export default Name;