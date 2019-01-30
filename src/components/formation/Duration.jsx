import React, { Component } from 'react';

class Duration extends Component {
  render() {
    let years = (Math.floor(this.props.expDuration / 12)).toFixed(0);
    let months = this.props.expDuration - (years * 12);
    return (
      <span>
        {
          years > 0 ?
            (years > 1 ?
              years + " Years, "
              : years + " Year, ")
            : ""
        }
        {
          (months > 1 ?
            months + " Months"
            : months + " Month")
        }
      </span>
    );
  }
}

export default Duration;