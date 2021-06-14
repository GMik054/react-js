import React, { Component } from 'react';
import Name from './Name';
import Price from './Price';
import Description from './Description';
import ChangeCurrency from './ChagneCurrency'

class Product extends Component {

    render() {

        const { name, price, description, changecurrency} = this.props;

        return (
            <>
                <Name value={name} />
                <Price value={price} />
                <Description value={description} />
                <ChangeCurrency value={changecurrency}/>
            </>
        )
    }
}
export default Product;