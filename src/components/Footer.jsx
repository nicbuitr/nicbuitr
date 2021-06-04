import React, { Component } from 'react';
import fs from 'fs';

class Footer extends Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0,
      intervals: []
    };
  }

  scrollStep() {
    let intervals = this.state.intervals;
    if (window.pageYOffset === 0) {
      for (let i = 0; i < intervals.length; i++) {
        {
          clearInterval(intervals[i]);
        }
      }
      this.setState({ intervals: [] });
    }
    window.scroll(0, window.pageYOffset - (window.pageYOffset / 10));
  }

  scrollToTop() {
    let state = this.state;
    let intervalId = setInterval(() => { this.scrollStep() }, 5);
    state.intervalId = intervalId;
    state.intervals.push(intervalId);
    this.setState(state);
  }

  render() {
    let copy = fs.readFileSync('./src/api/copyright.txt', 'utf8');
    return (
      <section className="footer container">
        <p>Find me:</p>
        <div className="footer__social">
          <a href="https://github.com/nicbuitr" target="_blank" rel="noopener" alt="URL to Nicbuitr's GitHub">
            <i className="fa fa-github fa--36 fa--opacity"></i>
            <div>GitHub</div>
          </a>
          <a href="https://www.linkedin.com/in/nicolasbuitrago/" target="_blank" rel="noopener" alt="URL to Nicbuitr's LinkedIn">
            <i className="fa fa-linkedin fa--36 fa--opacity"></i>
            <div>LinkedIn</div>
          </a>
        </div>
        <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank" rel="noopener" alt="Footer - URL to W3Schools">w3.css</a> <br /> &copy; {new Date().getFullYear()} {copy}</p>
        <div className="back-top" tabIndex="0" onClick={() => { this.scrollToTop(); }} onKeyPress={() => { this.scrollToTop(); }}><span><i className="fa fa-arrow-circle-up fa--36"></i></span></div>
      </section>
    );
  }
}

export default Footer;