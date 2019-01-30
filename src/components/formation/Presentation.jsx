import React, { Component } from 'react';

class Presentation extends Component {
  render() {
    let summary = this.props.summary;
    let personal_skills = this.props.personal_skills;
    return (
      <div className="app__summary app__sheet container" tabIndex="0">
        <div className="sheet__header">
          <h2>
            <i className="fa fa-id-card fa-fw fa--36"></i>
            Presentation
          </h2>
        </div>
        <div className="app__presentation container font-secondary-color">
          {summary
            .map((line, index) => {
              return (
                <p key={"summary_paragraph_" + index} id={"summary_paragraph_" + index}>{line}</p>
              )
            })}
          <hr />
        </div>
        <div className="app__personal-skills fade">
          <h3>
            <b>
              <i className="fa fa-asterisk fa-fw"></i>
              Interpersonal Skills
              </b>
          </h3>
          <div className="font-secondary-color">
            <ul>
              {personal_skills
                .map((skill, index) => {
                  return (
                    <li key={"personal_skill_" + index} id={"personal_skill_" + index}>
                      <span>{skill}</span>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Presentation;