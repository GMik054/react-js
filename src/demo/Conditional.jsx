import React, { Component } from 'react';

class Conditional extends Component {
state = {
    text1: "open",
    text2: "close",
    show: true

};

toggle = ()=>{
    this.setState({
        show: !this.state.show 
    })
}

    render() {
       const  {text1, text2, show} = this.state;

        return (
            <>
            <h2>{ show ? text1 : text2}</h2>
            <button
            onClick={this.toggle}>
           Toggle </button>
            </>
        )
    }
}

export default Conditional;