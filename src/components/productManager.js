import React, { Component } from 'react'
import styled from 'styled-components'
import Product from './product'

import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag';
import { validateOperation } from 'apollo-link/lib/linkUtils';


const GetProducts = gql`
  query GetProducts {
  Products{
    name
    sell
  }
}
`



const Container = styled.div`
        width:100%;
`

class ProductManager extends Component {


    render() {
        const {products} = this.props
        const DisplayProduct = (list)=>{
            
                if(list.loading === false){
                 return   <div>
                    { list.Products.map((e,i)=><Product key={i} {...e} ></Product>)}
                 </div>
                }
                else {
                    return <div/>
                }
        }
    return (
      <Container>
            {DisplayProduct(products)}
      </Container>
    )
  }
}

export default graphql(GetProducts,{name:'products'})(ProductManager)