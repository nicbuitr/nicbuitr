import React, { Component } from 'react';

class Education extends Component {
  render() {
    let props = this.props;
    let ed = props.education;
    return (
      <div className="app__ed container font-secondary-color" id={props.id} tabIndex="0">
        <div className="title"><b>{ed.title} / {ed.institution}</b></div>
        <div className="dates">
          <i className="fa fa-calendar fa-fw"></i>
          {ed.end_date.replace(/\s/g, "").toUpperCase() === "FOREVER" ? ed.end_date : ed.start_date + " - " + ed.end_date}
        </div>
        <p>
          <i className="fa fa-graduation-cap fa-fw"></i>
          {ed.degree}
        </p>
        {ed.achievements
          .map((achievement, index) => {
            return (
              <p key={props.id + "_achievement_" + index} id={props.id + "_achievement_" + index} tabIndex="0">
                <i className="fa fa-trophy fa-fw"></i>
                {achievement}
              </p>
            );
          })}
        <p>{ed.field}</p>
        {props.i < props.total - 1 ? <hr /> : <br />}
      </div>
    );
  }
}

export default Education;