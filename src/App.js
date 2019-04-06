import React, { Component } from "react";
import "./App.css";
import Lottery from "./components/lottery/lottery";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Draft Lottery Generator</h1>
        </header>
        <Lottery />
      </div>
    );
  }
}

export default App;
