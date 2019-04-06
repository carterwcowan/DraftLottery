import React, { Component } from "react";

const Player = ({ name, onClick }) => <li onClick={onClick}>{name}</li>;

const PlayerList = ({ items, onItemClick }) => (
  <ol>
    {items.map((item, i) => (
      <Player key={i} name={item} onClick={onItemClick} />
    ))}
  </ol>
);

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      players: []
    };
    this.run = this.run.bind(this);
  }

  onClick = () => {
    const { inputValue, players: players } = this.state;
    if (inputValue) {
      const nextState = [...players, inputValue];
      this.setState({ players: nextState, inputValue: "" });
    }
  };

  run = () => {
    console.log(this.state);
    const draftOrder = this.getDraftOrder(this.state.players);
    alert(draftOrder);
  };

  onChange = e => this.setState({ inputValue: e.target.value });

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
    var m = array.length,
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
    const { players: players, inputValue } = this.state;
    return (
      <div className="lottery-container">
        <div className="lotter-wrapper">
          <PlayerList items={players} onItemClick={this.handleItemClick} />
          <input type="text" value={inputValue} onChange={this.onChange} />
          <button className="addPlayer" onClick={this.onClick}>
            Add
          </button>
        </div>
        <div className="controls">
          <button onClick={this.run}>Run Lottery!</button>
        </div>
      </div>
    );
  }
}

export default Lottery;
