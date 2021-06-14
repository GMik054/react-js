import React, { Component } from 'react';
import Price from './Price';

class ChangeCurrency extends Component {


    render() {

        return (
            <>
                <button onClick={this.change}>{this.props.value}</button>
            </>
        )
    }
}

export default ChangeCurrency;