import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board'
  
  class Game extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            history: [{
                position: null,
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            historyAscending: true
        }
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                position: i,
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
        console.log(history.length);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    displayPosition(pos)
    {
        return " (" + (pos % 3 + 1) + ", " + (Math.floor(pos / 3) + 1) + ")"
    }
    
    troggle()
    {
        this.setState({
            historyAscending: !this.state.historyAscending
        })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      let winnerSquares = calculateWinner(current.squares);
      const winner = winnerSquares ? current.squares[winnerSquares[0]] : null;

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + this.displayPosition(step.position) :
          'Go to game start';
        const className = move === this.state.stepNumber ? "selected" : "";
        return (
            <li key={move}>
              <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
        );
      });
      const movesDisplay = this.state.historyAscending ? moves : moves.slice().reverse()

      let status;
      if (history.length === 10 && !winner)
      {
        status = 'Game goes to the Cat.';
        winnerSquares = [0, 1, 2, 3, 6, 7 ,8];
      }
      else if (winner) 
      {
        status = 'Winner: ' + winner;
      } else
      {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares} 
              winnerSquares={winnerSquares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <div>
                <button onClick={() => this.troggle()}>Reverse History Order</button>
            </div>
            <ol>{ movesDisplay }</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  