import React, { Component } from 'react';
import Presentation from './Presentation';
import Experience from './Experience';
import Education from './Education';
import Duration from './Duration';

class Formation extends Component {

  render() {
    let props = this.props;
    let summary = props.summary;
    let personal_skills = props.personal_skills;

    return (
      <section className="app__formation fade">
        <Presentation summary={summary} personal_skills={personal_skills} />
        <div className="app__experiences app__sheet container fade" tabIndex="0">
          <div className="sheet__header">
            <h2>
              <i className="fa fa-suitcase fa-fw fa--36"></i>
              Work Experience
            </h2>
            <h3>
              <i className="fa fa-calendar-check fa-fw"></i>
              <Duration expDuration={props.filteredExpDuration} />
            </h3>
          </div>
          <div className="app__search-box" id="app__search-box">
            <input type="text" aria-label="Type to search" ref="textInput" name="searchString"
              placeholder="Type to search" value={props.searchString} onChange={props.parentSearch}
            />
          </div>
          {props.filteredExperiences
            .map((experience, index) => {
              return (
                <Experience experience={experience} key={"experience_" + index} id={"experience_" + index}
                  i={index} total={props.filteredExperiences.length} filteredExpDuration={props.filteredExpDuration}
                  parentCalculateDuration={props.calculateDuration} parentHandleClick={props.parentHandleClick}
                />
              )
            })}
        </div>
        <div className="app__education app__sheet container fade" tabIndex="0">
          <div className="sheet__header">
            <h2>
              <i className="fa fa-university fa-fw fa--36"></i>
              Education
            </h2>
          </div>
          {props.filteredEducation
            .map((education, index) => {
              return (<Education education={education} key={"education_" + index} id={"education_" + index} i={index} total={props.filteredEducation.length} />)
            })}
        </div>
        <div className="app__interests app__sheet container fade" tabIndex="0">
          <div className="sheet__header">
            <h2>
              <i className="fa fa-coffee fa-fw fa--36"></i>
              Interests
            </h2>
          </div>
          {props.filteredInterests
            .map((interest, i) => {
              return (
                <span className="font-secondary-color fade" tabIndex="0" key={"interest_" + i} id={"interest_" + i}>
                  <span><i className="fa fa-caret-right fa-fw"></i></span>
                  <p>
                    {interest}
                    <br />
                    <br />
                  </p>
                </span>
              )
            })}
        </div>
        <div className="app__tech-skills app__sheet container fade" tabIndex="0">
          <div className="sheet__header">
            <h2>
              <i className="fa fa-laptop fa-fw fa--36"></i>
              Technical Skills
            </h2>
          </div>
          <p>
            {props.techSkills}
          </p>
        </div>
      </section>
    );
  }
}

export default Formation;