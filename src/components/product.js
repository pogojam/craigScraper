import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
        width:100%;
`


export default class Product extends Component {

  render() {
      const {name} = this.props
    return (
      <Container>
        {name}
      </Container>
    )
  }
}
