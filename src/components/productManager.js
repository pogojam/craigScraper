import React, { Component } from 'react'
import styled from 'styled-components'
import Product from './product'

const Container = styled.div`
        width:100%;
`

export default class ProductManager extends Component {
    render() {
        const {ProductList} = this.props
        const DisplayProduct = (list)=>{
            console.log(list.length);
            
                if(list.length > 0){
                 return   list.map((name,i)=><Product key={i} name={name} />)
                }
        }
    return (
      <Container>
            {DisplayProduct(ProductList)}
      </Container>
    )
  }
}
