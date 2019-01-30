import React, { Component } from 'react';

class Skill extends Component {
  render() {
    let sk = this.props.skill;
    return (
      <div className="app__skill" id={this.props.id}>
        <p>{sk.skill}</p>
        <div className="pctg__background">
          <div className="pctg__front" style={{ width: sk.pctg.toFixed(0) + "%" }}>
            {sk.pctg.toFixed(0)}%
          </div>
        </div>
      </div>
    );
  }
}

export default Skill;