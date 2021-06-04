import React, { Component } from 'react';
import Skill from './Skill';
import Language from './Language';
import avatar_md from '../../img/avatar_md.jpg';
import avatar_lg from '../../img/avatar_lg.jpg';

class Profile extends Component {

  render() {
    let props = this.props;
    let profile = props.profile;
    let skills = props.skills;
    return (
      <section className="app__profile">
        <div className="profile__avatar container">
          <picture className="profile__image">
            <source media="(min-width: 768px)" srcSet={avatar_lg} />
            <source media="(min-width: 601px)" srcSet={avatar_md} />
            <img className="avatar__image" src={avatar_lg} alt="Avatar" />
          </picture>
          <hr />
          <div className="profile__name container">
            <h2>{profile.names} {profile.surnames}</h2>
          </div>
        </div>
        <hr />
        <div className="profile__info container">
          <div className="profile__contact">
            <div className="profile__description">
              <span>
                <i className="fa fa-briefcase fa-fw fa--18"></i>
                {profile.profession}
              </span>
              <span>
                <i className="fa fa-home fa-fw fa--18"></i>
                {profile.location}
              </span>
            </div>
            <div className="profile__social">
              <a href={profile.github} target="_blank" rel="noopener" alt="URL to Nicbuitr's GitHub">
                <i className="fa fa-github fa--36 fa--opacity"></i>
                <div>GitHub</div>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener" alt="URL to Nicbuitr's LinkedIn">
                <i className="fa fa-linkedin fa--36 fa--opacity"></i>
                <div>LinkedIn</div>
              </a>
            </div>
          </div>
          <hr />
          <div className="profile__languages" tabIndex="0">
            <p className="profile__header">
              <b>
                <i className="fa fa-globe fa-fw"></i>
                Languages
            </b>
            </p>
            {profile.languages
              .map((language, index) => {
                return (<Language language={language} key={"language" + index} id={"language_" + index} i={index} total={profile.languages.length} />)
              })}
          </div>
          <div className="profile__skills fade" tabIndex="0">
            <span>
              <p className="profile__header">
                <b>
                  <i className="fa fa-asterisk fa-fw"></i>
                  Skills
                </b>
              </p>
              <p>Show <input type="text" aria-label="Number of skills to show" ref="textInput" name="numberOfSkills" value={props.numberOfSkills} onChange={props.parentRenderSkills} /></p>
            </span>
            {skills.slice(0, props.numberOfSkills)
              .map((skill, index) => {
                return (<Skill skill={skill} key={"skill_" + index} id={"skill_" + index} i={index} total={skills.length} />)
              })}
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;