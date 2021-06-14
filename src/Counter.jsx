import React, { Component } from 'react';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defoultValue
        }
    }

handleClickPlus = ()=>{
    this.setState({
         value: this.state.value + 1   
    });

}
handleClickMinus = ()=>{
    this.setState({
         value: this.state.value - 1   
    });
}
    render() {
        return (

            <div>
                <br />
                <h1>{this.state.value}</h1>
                <button onClick={this.handleClickMinus}>-</button>
                <button onClick={this.handleClickPlus}>+</button>
            </div>

        )
    }
}

export default Counter;