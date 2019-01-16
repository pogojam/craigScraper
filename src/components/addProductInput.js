import React, { Component } from 'react'

export default class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input:''
    }
}

  handleChange(e){
      this.setState({
        input:e.target.value
      })
  }

  render() {
    const {handleAddProducts} = this.props
    return (
      <div>
        <form onSubmit={(e)=>handleAddProducts(e,this.state.input)}  >
            <input type="text" onChange={this.handleChange.bind(this)} value={this.state.input}  placeholder="Enter Product" />
            <input type="submit" value="Submit" />
          </form>        
      </div>
    )
  }
}
