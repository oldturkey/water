import React from 'react';

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


