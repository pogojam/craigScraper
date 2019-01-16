import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
  });

const Entry = ()=>(<ApolloProvider client={client} >
        <App/>
</ApolloProvider>)

ReactDOM.render(<Entry/>,document.getElementById('App'))

