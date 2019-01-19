import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo'

const RemoveProduct = gql`
    mutation removeProduct($name:String){
      removeProduct(name:$name){
          name
      }
    }
`

const Container = styled.div`
        width:100%;
        display:flex;
        flex-direction:row;
        justify-content: space-evenly;
    align-items: center;

`

const Button = styled.button`
    background:none;
    border:none;
    background-image:url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1547865059/cancel.svg");
    width: 14px;
    height: 14px;
`

class Product extends Component {

  handleRemove(value){
    this.props.remove({variables:{
      name:value
    }})
  }

  render() {
      const {name,buy,sell,avgSell,id} = this.props
    return (
      <Container>
        <h2>
        {name}
        </h2>
        <h3>
        Buy ${buy}
        </h3>
        <h3>
        Sell ${sell}
        </h3>
        <h3>
        Avg Selling Price ${avgSell}
        </h3>
        <Button onClick={()=>this.handleRemove(name)} >
        </Button>
      </Container>
    )
  }
}

export default graphql(RemoveProduct,{name:'remove',options:{
  refetchQueries:['Products']
}})(Product)