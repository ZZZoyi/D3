import React, { Component } from 'react';
// import styled from 'styled-components';

// const H1 = styled.h1`
// color: red;
// `
//
// const Div = styled.div`
// `
//
// export default class Hello extends Component {
//   render () {
//     return (
//       <Div>
//       <H1>this is new info</H1>
//       </Div>
//     )
//   }
// }


export default class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  handleClick(name, who, e) {
    // console.log(who)
    // console.log(name)
    console.log(this.refs.elP)
    this.setState({ liked: !this.state.liked });
  }

  render() {
    const text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p ref={'elP'} onClick={this.handleClick.bind(this, 'name~~~~~~~~~~~', 'who~~~~~~~~~')}>
          You {text} this. Click to toggle.
      </p>
    );
  }
}
