import React from 'react';

//右上角时钟组件
export default class clock extends React.Component {
  state = {date: new Date()};

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <span>{this.state.date.toLocaleString()}</span>
    );
  }
}


