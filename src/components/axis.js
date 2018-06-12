import React, {Component} from 'react'
import * as d3 from 'd3'

export default class axis extends Component {
  constructor (props) {
    super(props)
    this.refX = React.createRef()
    this.refY = React.createRef()
    this.x = d3.scaleTime().range([0, 0])
    this.y = d3.scaleLinear().range([0, 0])
  }

  componentDidUpdate () {
    this.x.range([0, this.props.axisWidth - 100]).domain(d3.extent(this.props.axisRange.map(d => d.date)))
    this.y.range([this.props.axisHeight - 100, 0]).domain([0, d3.max(this.props.axisRange.map(d => d.value)) + 100])
    this.customAxisX(d3.select(this.refX.current))
    this.customAxisY(d3.select(this.refY.current))
  }

  customAxisX (g) {
    const timeAxis = d3.axisBottom(this.x).ticks(12, '%H:%M').tickSize(0).tickPadding(10)
    g.attr('class', 'axis')
      .attr('transform', 'translate(0, 398)')
      .call(timeAxis)
  }

  customAxisY (g) {
    const axisY = d3.axisLeft(this.y).tickSize(0).ticks(5)
    g.call(axisY)
  }

  render () {
    return (
      <g>
        <g ref={this.refX}></g>
        <g ref={this.refY}></g>
      </g>
    )
  }
}

axis.defaultProps = {
  axisRange: [
    {date: new Date(1528041600000), value: 35},
    {date: new Date(1528051600000), value: 80},
    {date: new Date(1528061600000), value: 200},
    {date: new Date(1528071600000), value: 150}
  ],
  axisWidth: 800,
  axisHeight: 400
}
