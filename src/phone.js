import React, { Component } from 'react'

export default class GroceryList extends Component {

  handleClick(i) {
    console.log(this.props.items[i])
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, i) => {
          return (
            <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          )
        })}
      </div>
    )
  }
}
