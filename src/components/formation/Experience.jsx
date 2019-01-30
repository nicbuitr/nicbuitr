import React, { Component } from 'react';
import Duration from './Duration';

class Experience extends Component {

  render() {
    let props = this.props;
    let exp = props.experience;
    let expDuration = props.parentCalculateDuration(exp.end_date, exp.start_date);
    return (
      <div className="app__exp container font-secondary-color fade" id={props.id} tabIndex="0">
        <h5><b>{exp.job_title + " / " + exp.company}</b></h5>
        <h6>
          <i className="fa fa-calendar fa-fw"></i>
          {exp.start_date} - {exp.end_date.replace(/\s/g, "").toUpperCase() === "CURRENT" ? <span className="current-tag">{exp.end_date}</span> : exp.end_date}
        </h6>
        <h6>
          <i className="fa fa-calendar-check fa-fw"></i>
          <Duration expDuration={expDuration} />
        </h6>
        <p><b>
          {exp.skills.map((skill, i) => {
            return (
              <span key={"exp_" + props.i + "_skill_" + i} id={"exp_" + props.i + "_skill_" + i}>
                {skill}
                {i < exp.skills.length - 1 ? " • " : null}
              </span>
            )
          })
          }
        </b></p>
        <div className="exp__description" id={"exp_description_" + props.i}>
          {exp.job_description.map((line, i) => {
            return (
              <span key={"exp_" + props.i + "_line_" + i} id={"exp_" + props.i + "_line_" + i} tabIndex="0">
                <span><i className="fa fa-caret-right fa-fw"></i></span>
                <p>
                  {
                    line.includes(' - ') ?
                      line.split(' - ').map((part, j) => {
                        return j === 1 ?
                          <span key={"exp_" + props.i + "_line_" + i + "_section_" + j}>
                            <a href={"http://" + part} target="_blank">{part}</a>
                          </span>
                          :
                          <span key={"exp_" + props.i + "_line_" + i + "_section_" + j}>
                            {j === 0 ? part + " - " : " - " + part}
                          </span>
                      })
                      :
                      line
                  }
                </p>
              </span>
            )
          })}
        </div>
        <div className="button" tabIndex="0" onClick={props.parentHandleClick} onKeyPress={props.parentHandleClick} key={"exp_description_" + props.i + "_button"} id={"exp_description_" + props.i + "_button"}>
          <i className="fa fa-chevron-down fa--36"></i>
        </div>
        {props.i < props.total - 1 ? <hr /> : <br />}
      </div>
    );
  }
}

export default Experience;