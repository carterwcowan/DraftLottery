import React, { Component } from "react";

const Player = ({ name, onClick }) => <li onClick={onClick}>{name}</li>;

const PlayerList = ({ items, onItemClick }) => (
  <ol>
    {items.map((item, i) => (
      <Player key={i} name={item} onClick={onItemClick} />
    ))}
  </ol>
);

const ResultsList = ({ results }) => (
  <div>
    <h2>Draft Order</h2>
    <ol>
      {results.map((result, i) => (
        <Result key={i} name={result} />
      ))}
    </ol>
  </div>
);

const Result = ({ name }) => <li>{name}</li>;

const LotteryView = props => {
  const showResults = props.showResults;
  const players = props.players;
  const inputValue = props.inputValue;
  const handleItemClick = props.handleItemClick;
  const onChange = props.onChange;
  const onClick = props.onClick;
  const onKeyDown = props.onKeyDown;
  const results = props.results;
  if (!showResults) {
    return (
      <div className="add-players">
        <h2>Standings</h2>
        <PlayerList items={players} onItemClick={handleItemClick} />
        <input type="text" value={inputValue} onChange={onChange} onKeyDown={onKeyDown} />
        <button className="addPlayer" onClick={onClick}>
          Add
        </button>
      </div>
    );
  }
  return (
    <div className="results">
      <ResultsList results={results} />
    </div>
  );
};

const LotteryControls = props => {
  const showResults = props.showResults;
  const players = props.players;
  const run = props.run;
  const reset = props.reset;

  if (players.length > 0 || showResults) {
    return (
      <div className="controls">
        <button onClick={run}>Run Lottery!</button>
        <button onClick={reset}>Reset?</button>
      </div>
    );
  }
  return (
    <div className="controls">
      <button onClick={run}>Run Lottery!</button>
    </div>
  );
};

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      players: [],
      results: [],
      showResults: false
    };
    this.run = this.run.bind(this);
  }

  addPlayer = () => {
    const { inputValue, players } = this.state;
    if (inputValue) {
      const nextState = [...players, inputValue];
      this.setState({ players: nextState, inputValue: "" });
    }
  };

  run = () => {
    const draftOrder = this.getDraftOrder(this.state.players);
    // this.state.results = draftOrder;
    this.setState({ results: draftOrder, showResults: true });
  };

  reset = () => {
    this.setState({ showResults: false, players: [], results: [] });
  };

  onChange = e => this.setState({ inputValue: e.target.value });

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.addPlayer();
    }
  }

  handleItemClick = e => {
    console.log(e.target.innerHTML);
  };

  createTickets(userList) {
    let ticketList = [];
    for (let index = 0; index < userList.length; index++) {
      const name = userList[index];
      for (let i = 0; i < index + 1; i++) {
        ticketList.push(name);
      }
    }
    return ticketList;
  }

  getDraftOrder(userList) {
    let ticketList = this.createTickets(userList);
    let picksRemaining = userList.length;
    let draftOrder = [];

    for (let i = picksRemaining; i > 0; i--) {
      ticketList = this.shuffle(ticketList);
      let pick = this.makePick(ticketList);
      draftOrder.push(pick);
      picksRemaining--;
      ticketList = ticketList.filter(player => player !== pick);
    }

    return draftOrder;
  }

  makePick(ticketArray) {
    let index = Math.floor(Math.random() * ticketArray.length);
    return ticketArray[index];
  }

  shuffle(array) {
    let m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  render() {
    const {
      players,
      inputValue,
      results,
      showResults
    } = this.state;
    return (
      <div className="lottery-container">
        <div className="lotter-wrapper">
          <LotteryView
            showResults={showResults}
            players={players}
            inputValue={inputValue}
            handleItemClick={this.handleItemClick}
            onChange={this.onChange}
            onClick={this.addPlayer}
            results={results}
            onKeyDown={this.onKeyDown}
          />
          <LotteryControls
            showResults={showResults}
            players={players}
            run={this.run}
            reset={this.reset}
          />
        </div>
      </div>
    );
  }
}

export default Lottery;
