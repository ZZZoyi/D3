import React, {Component} from 'react'
import styled from 'styled-components'
import './title-square.css'

let Div = styled.div`
  color: red;
`

export default class TitleSquare extends Component {
  render () {
    return (
      <Div>
        <div className="div1"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </Div>
    )
  }
}
