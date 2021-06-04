/**
 * @author Nicolás Buitrago Castaño (nicbuitr)
 * @license MIT
 */
import React, { Component } from 'react';
import Profile from './profile/Profile';
import Formation from './formation/Formation';
import jsonData from '../api/data.json';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      numberOfSkills: 5,
      intervals: [],
      filteredExperiences: [],
      filteredExpDuration: 0,
      filtSkillPctgArray: [],
      techSkills: '',
      filteredEducation: [],
      filteredInterests: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.renderNumberOfSkills = this.renderNumberOfSkills.bind(this);
    this.calculateDuration = this.calculateDuration.bind(this);
  }

  componentDidMount() {
    document.documentElement.lang = 'en';
    this.renderSearchResults();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset === 0) {
      // Reset the faded items when back on top
      let fadedInItems = document.getElementsByClassName("fade--in");
      for (let i = 0; i < fadedInItems.length; i++) {
        {
          fadedInItems[i].classList.remove("fade--in");
        }
      }
    }
    else {
      let fadeInItems = document.querySelectorAll(".fade");
      fadeInItems.forEach((elem) => {
        if (window.pageYOffset > (elem.offsetTop - window.innerHeight + 50)) {
          elem.classList.add("fade--in");
        }
      });
    }

    let searchBox = document.getElementById("app__search-box");
    let paddingTop = 85; // To push down text that gets overlapped
    if (window.pageYOffset > searchBox.offsetTop && !searchBox.classList.contains("app__search-box--fixed")) {
      searchBox.classList.add("app__search-box--fixed");
      if (searchBox.nextSibling !== null) {
        searchBox.nextSibling.style.paddingTop = paddingTop + "px";
      }
    }
    else if (window.pageYOffset < (searchBox.previousSibling.offsetTop + searchBox.previousSibling.offsetHeight)) {
      searchBox.classList.remove("app__search-box--fixed");
      if (searchBox.nextSibling !== null) {
        searchBox.nextSibling.style.paddingTop = "0";
      }
    }
  }

  scrollStep(targetYOffset, target) {
    let intervals = this.state.intervals;
    if (window.pageYOffset <= targetYOffset) {
      for (let i = 0; i < intervals.length; i++) {
        {
          clearInterval(intervals[i]);
        }
      }
      this.setState({ intervals: [] });
      if (target !== undefined && target.classList.contains("button--expanded")) {
        target.classList.remove("button--expanded");
      }
    }
    else {
      window.scroll(0, window.pageYOffset - ((window.pageYOffset - targetYOffset) / 10));
    }
  }

  handleClick(e) {
    if (e != undefined) {
      let target = e.target.tagName.toUpperCase() === "DIV" ? e.target : e.target.parentElement;
      let prevSiblingId = target.id.replace('_button', '');
      let prevSibling = document.getElementById(prevSiblingId);

      if (target.classList.contains("button--expanded")) {
        let state = this.state;
        prevSibling.style.maxHeight = "12em";
        let targetYOffset = prevSibling.offsetTop - document.getElementById("app__search-box").offsetHeight;
        let intervalId = setInterval(() => { this.scrollStep(targetYOffset, target) }, targetYOffset / 1000);
        state.expandIntervalId = intervalId;
        state.intervals.push(intervalId);
        this.setState(state);
      }
      else {
        target.classList.add("button--expanded");
        prevSibling.style.maxHeight = prevSibling.scrollHeight + "px";;
      }
    }
  }

  renderSearchResults(e) {
    let searchString = "";
    let nState = this.state;
    if (e != undefined) {
      if (e.target.name === 'searchString') {
        e.preventDefault();
        searchString = e.target.value;
        nState.searchString = e.target.value;
      }
    }

    let filteredExperiences = jsonData.work_experiences
      .filter((experience) => {
        return (
          experience.job_title.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
          || experience.company.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
          || experience.skills.findIndex(item => item.toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())) != -1
        )
      })

    nState.filteredExperiences = filteredExperiences;

    let filteredExpDuration = filteredExperiences.reduce((totalDuration, experience) => {
      let expDuration = this.calculateDuration(experience.end_date, experience.start_date);
      return totalDuration + expDuration;
    }, 0);

    nState.filteredExpDuration = filteredExpDuration;

    let filtSkillPctgArray = [];
    filteredExperiences
      .map((experience) => {
        let expDuration = this.calculateDuration(experience.end_date, experience.start_date);
        let expPctg = ((expDuration / filteredExpDuration) * 100);

        experience.skills
          .map((skill) => {
            let indexOfSkill = filtSkillPctgArray.findIndex(arraySkill => skill === arraySkill.skill);
            if (indexOfSkill === -1) {
              filtSkillPctgArray.push({ skill: skill, pctg: expPctg });
            }
            else {
              filtSkillPctgArray[indexOfSkill].pctg += expPctg;
              if (filtSkillPctgArray[indexOfSkill].pctg > 101) {
                filtSkillPctgArray[indexOfSkill].pctg = 100;
                console.error(skill + " skill seems to be duplicated at company's " + experience.company + " experience.");
              }
            }
          });
      });

    filtSkillPctgArray.sort((a, b) => b.pctg - a.pctg);

    let searchedSkillIndex = filtSkillPctgArray.findIndex(item => item.skill.toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase()));
    if (searchedSkillIndex !== -1) {
      let searchedSkill = filtSkillPctgArray[searchedSkillIndex];
      filtSkillPctgArray.splice(searchedSkillIndex, 1);
      filtSkillPctgArray.unshift(searchedSkill);
    }

    let techSkillsStr = filtSkillPctgArray.map((skill, index) => {
      return skill.skill + ((index < filtSkillPctgArray.length - 1) ? " • " : "");
    });

    nState.techSkills = techSkillsStr;

    nState.filtSkillPctgArray = filtSkillPctgArray;

    let filteredEducation = jsonData.education
      .filter((education) => {
        return (
          education.degree.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
          || education.institution.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
          || education.title.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
          || education.field.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase())
        )
      })

    nState.filteredEducation = filteredEducation;

    let filteredInterests = jsonData.interests
      .filter((interests) => {
        return (interests.replace(/\s/g, "").toUpperCase().includes(searchString.replace(/\s/g, "").toUpperCase()))
      })

    nState.filteredInterests = filteredInterests;

    if (filteredExperiences.length >= 0) {
      let firstResult = document.getElementById("experience_0");
      if (firstResult != undefined) {
        let targetYOffset = firstResult.offsetTop;
        let intervalId = setInterval(() => { this.scrollStep(targetYOffset) }, targetYOffset / 1000);
        nState.searchIntervalId = intervalId;
        nState.intervals.push(intervalId);
      }
    }

    this.setState(nState);
  }

  renderNumberOfSkills(e) {
    if (e != undefined) {
      if (e.target.name === 'numberOfSkills') {
        e.preventDefault();
        this.setState({ numberOfSkills: e.target.value });
      }
    }
  }

  calculateDuration(dateString2, dateString1) {
    let date1 = new Date(dateString1.split(' ')[0] + ' 1 ' + dateString1.split(' ')[1] + ' 00:00:00');
    let nDate = new Date();
    let date2 = dateString2.toUpperCase() === "CURRENT" ? new Date(nDate.getFullYear(), nDate.getMonth() - 2, 1) : new Date(dateString2.split(' ')[0] + ' 15 ' + dateString2.split(' ')[1] + ' 00:00:00');
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.ceil(diff));
  }

  render() {
    let state = this.state;
    return (
      <section className="app">
        <Profile profile={jsonData} searchString={state.searchString} skills={state.filtSkillPctgArray}
          numberOfSkills={state.numberOfSkills} parentRenderSkills={this.renderNumberOfSkills}
        />
        <Formation summary={jsonData.summary} personal_skills={jsonData.personal_skills}
          filteredExperiences={state.filteredExperiences} filteredExpDuration={state.filteredExpDuration}
          filteredEducation={state.filteredEducation} filteredInterests={state.filteredInterests}
          parentHandleClick={this.handleClick} searchString={state.searchString} techSkills={this.state.techSkills}
          parentSearch={this.renderSearchResults} calculateDuration={this.calculateDuration}
        />
      </section>
    );
  }
}

export default App;