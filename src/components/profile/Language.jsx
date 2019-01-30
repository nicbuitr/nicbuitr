import React, { Component } from 'react';

class Language extends Component {
  render() {
    let lang = this.props.language;
    return (
      <div className="app__language" id={this.props.id}>
        <p>{lang.language} ({lang.level})</p>
        <div className="pctg__background">
          <div className="pctg__front" style={{ width: lang.lang_pctg + "%" }}>
            {lang.lang_pctg}%
          </div>
        </div>
      </div>
    );
  }
}

export default Language;