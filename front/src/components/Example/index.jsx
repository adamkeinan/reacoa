import React, {Component} from 'react';
import logo from './logo.svg';
import './index.sass';

class Example extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>front/src/App.jsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://github.com/yuri2peter/reacoa.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Reacoa
          </a>
        </header>
      </div>
    );
  }
}

export default Example;
