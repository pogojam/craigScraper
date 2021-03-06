import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ProductManager from './productManager'

import AddProductInput from './addProductInput'

import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag';


// const  UpdateUser = gql`
//         mutation updateUser ($name:String,$email:String,$phone:ID){
//             updateUser(name:$name,email:$email,phone:$phone){
//                   name
//             }
//         }
// `

const AddProduct = gql`
    mutation search ($name:String){
            search(name:$name){
                prices,
                id,
                avgSell,
                buy,
                sell
            }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:90%;

`


class App extends Component {
    constructor(props) {
            super(props)
            this.state ={
                producs:[]
            }
    }

 handleAddProducts(e,value){
        e.preventDefault()

       this.props.AddProduct({variables:{name:value}}).then((data)=>{
                console.log(data);
       })

        this.setState({
            producs:[...this.state.producs,value]
        })
    }

    render() {

        const {producs} = this.state
        
      return (
        <Container>
            <h1>Craigslist Buy Sell Tool</h1>
            <h2>Track Product</h2>
        <AddProductInput handleAddProducts={this.handleAddProducts.bind(this)} />
        <ProductManager ProductList={producs} />
        </Container>
      )
    }
}


export default graphql(AddProduct,{name:'AddProduct',options:{
    refetchQueries:['Products']
}})(App)