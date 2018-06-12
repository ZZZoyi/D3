import React, {Component} from 'react'
import styled from 'styled-components'
// import Axis from './axis.js'
import * as d3 from 'd3'

const Div = styled.div`
  height: 100%;
`

const Svg = styled.svg`
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid red;
  border-radius: 5px;
`

const G = styled.g`
  transform: translate(50px, 50px)
`

const Path = styled.path`
  fill: url("#linearGrandient");
  opacity: 0.5;
`

const PathLine = styled.path`
  fill: none;
  stroke: #5cadd6;
  stroke-width: 2;
`

const Stop0 = styled.stop`
  stop-color: #5cadd6;
`

const Stop1 = styled.stop`
  stop-color: #fff;
`

export default class chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      testData: 'this is chart',
      width: 0,
      height: 0
    }
    this.refSvg = React.createRef()
    this.refX = React.createRef()
    this.refY = React.createRef()
    this.initAxes()
    this.line = d3.line().x(d => this.x(d.date)).y(d => this.y(d.value)).curve(d3.curveCardinal.tension(0.3))
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount () {
    let svg = this.refSvg.current
    this.setState({width: svg.clientWidth})

    d3.select(svg).on('mousemove', (e) => this.onMouseMove(e))
    d3.select(svg).on('mouseleave', (e) => this.onMouseLeave(e))

    this.onResize()
    window.addEventListener('resize', this.onResize, false)
  }

  onResize () {
    let svg = this.refSvg.current
    this.setState({width: svg.clientWidth, height: svg.clientHeight})
  }

  updateAxis () {
    this.customAxisX(d3.select(this.refX.current))
    this.customAxisY(d3.select(this.refY.current))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize, false)
  }

  componentDidUpdate (prevProps, prevState) {
    let { width, height } = this.state
    if (width !== prevState.width || height !== prevState.height) {
      this.updateAxis()
    }

    if (prevProps.pathData !== this.props.pathData) {
      this.x.domain(d3.extent(this.props.pathData.map(d => d.date)))
      this.y.domain([0, d3.max(this.props.pathData.map(d => d.value)) + 100])
      this.updateAxis()
      this.forceUpdate()
    }
  }

  initAxes () {
    this.x = d3.scaleTime().range([0, 0])
    this.y = d3.scaleLinear().range([0, 0])
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

  handleClick (e) {
    console.log('click me')
  }

  onMouseMove (e) {
    let svg = this.refSvg.current
    let [px, py] = d3.mouse(svg)
    let rangeX = this.x.range()
    let rangeY = this.y.range()
    if (px - 50 >= (rangeX[0]) && px - 50 <= (rangeX[1]) && py - 50 <= rangeY[0] && py - 50 >= rangeY[1]) {
      this.showDataInfo(px - 50, py - 50)
    } else {
      d3.select(this.refSvg.current).select('.dataInfo').remove()
    }
  }

  onMouseLeave (e) {
    d3.select(this.refSvg.current).select('.dataInfo').remove()
  }

  showDataInfo (px, py) {
    let date = this.x.invert(px)
    let middleI = Math.floor(this.props.pathData.length/2) - 1
    let i = d3.scan(this.props.pathData, (a, b) => Math.abs(a.date - date) - Math.abs(b.date - date))
    let {date: tdate, value} = i >= 0 ? this.props.pathData[i] : {}
    let tx = this.x(tdate)
    let ty = this.y(value)
    let gData = d3.select('.dataInfo')
    let datefmt = d3.timeFormat('%Y-%m-%d %H:%M:%S')
    if (gData.size() <= 0) {
      gData = d3.select(this.refSvg.current).append('g').classed('dataInfo', true)

      let defs = gData.append('defs')
      let linearGradient_line = defs.append('linearGradient')
        .attr('id', 'linearColor')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
      linearGradient_line.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#5cadd6')
      linearGradient_line.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#fff')

      gData.append('rect')
        .classed('valRect', true)
        .attr('fill', 'url(#' + linearGradient_line.attr('id') + ')')

      gData.append('rect')
        .classed('valInfo', true)
        .attr('stroke', 'none')
        .attr('fill', 'rgba(92, 173, 214, .5)')
        .attr('border-radius', '10px')

      gData.append('circle')
        .classed('valCircle_0', true)
        .attr('fill', '#5cadd6')

      gData.append('circle')
        .classed('valCircle_1', true)
        .attr('fill', 'none')
        .attr('stroke', '#5cadd6')

      gData.append('text')
        .classed('valText', true)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')

      gData.append('text')
        .classed('valTextTime', true)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')

      gData.append('circle')
        .classed('valTextCircle', true)
        .attr('fill', '#5cadd6')
    }
    gData.select('.valRect')
      .attr('x', tx + 50)
      .attr('y', 100)
      .attr('width', '2')
      .attr('height', '350')

    if (i <= middleI) {
      gData.select('.valInfo')
        .attr('x', tx + 70)
        .attr('y', ty - 30)
        .attr('width', 150)
        .attr('height', 50)
        .attr('rx', 10)
        .attr('ry', 10)

      gData.select('.valText')
        .text(value)
        .attr('x', tx + 130)
        .attr('y', ty + 10)

      gData.select('.valTextTime')
        .text(datefmt(tdate))
        .attr('x', tx + 140)
        .attr('y', ty - 10)

      gData.select('.valTextCircle')
        .attr('cx', tx + 100)
        .attr('cy', ty + 5)
        .attr('r', 6)
    } else {
      gData.select('.valInfo')
        .attr('x', tx - 120)
        .attr('y', ty - 30)
        .attr('width', 150)
        .attr('height', 50)
        .attr('rx', 10)
        .attr('ry', 10)

      gData.select('.valText')
        .text(value)
        .attr('x', tx - 50)
        .attr('y', ty + 10)

      gData.select('.valTextTime')
        .text(datefmt(tdate))
        .attr('x', tx - 50)
        .attr('y', ty - 10)

      gData.select('.valTextCircle')
        .attr('cx', tx - 80)
        .attr('cy', ty + 5)
        .attr('r', 6)
    }

    gData.select('.valCircle_0')
      .attr('cx', tx + 50)
      .attr('cy', ty + 50)
      .attr('r', 3)

    gData.select('.valCircle_1')
      .attr('cx', tx + 50)
      .attr('cy', ty + 50)
      .attr('r', 6)

  }

  render () {
    let { width, height } = this.state
    this.x.range([0, width - 100]).domain(d3.extent(this.props.pathData.map(d => d.date)))
    this.y.range([height - 100, 0]).domain([0, d3.max(this.props.pathData.map(d => d.value)) + 100])
    this.area = d3.area().x(d => this.x(d.date)).y0(height - 100).y1(d => this.y(d.value)).curve(d3.curveCardinal.tension(0.3))
    return (
      <Div class="svgBoxs">
        <Svg innerRef={this.refSvg} onClick={(e) => this.handleClick(e)}>
          <G>
            <g ref={this.refX}></g>
            <g ref={this.refY}></g>
            {
              this.props.titles.map((el, i) => (
                <text x={el.x1} y={el.y1} key={i}>{el.title}</text>
              ))
            }
            <linearGradient id="linearGrandient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop0 offset="0%"></Stop0>
              <Stop1 offset="100%"></Stop1>
            </linearGradient>
            <PathLine d={this.line(this.props.pathData)}></PathLine>
            <Path d={this.area(this.props.pathData)}></Path>
          </G>
        </Svg>
      </Div>
    )
  }
}

chart.defaultProps = {
  titles: [{x1: 0, y1: 0, title: 'time-chart'}, {x1: 0, y1: 20, title: 'change-chart'}],
  pathData: [
    {date: new Date(1528041600000), value: 35},
    {date: new Date(1528051600000), value: 80},
    {date: new Date(1528061600000), value: 200},
    {date: new Date(1528071600000), value: 150},
    {date: new Date(1528081600000), value: 400},
    {date: new Date(1528091600000), value: 50},
    {date: new Date(1528095600000), value: 60},
    {date: new Date(1528099600000), value: 50},
    {date: new Date(1528101600000), value: 450},
    {date: new Date(1528111600000), value: 5}
  ]
}
