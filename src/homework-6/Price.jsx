import React, {Component} from 'react';

class Price extends Component{

    render(){
        const {value} = this.props

        return(
            <span>{value}</span>
        )
    }
    }
export default Price;