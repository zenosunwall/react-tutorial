import React from 'react';
import Square from './Square'

class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    renderBoard()
    {
        let board = [];
        for(let row = 0; row < 3; row++)
        {
            board.push(<div className="board-row">{this.renderRow(row)}</div>);
        }
        return board;
    }

    renderRow(row) 
    {
        let rowDisplay = [];
        for (let column = 0; column < 3; column++)
        {
            rowDisplay.push(this.renderSquare(row*3 + column));
        }
        return rowDisplay;
    }

    render() {
      return (
        <div>
          {this.renderBoard()}
        </div>
      );
    }
  }

  export default Board;