import { useState } from 'react';

//onClick call the onSquareClick which call the handleClick function which updates
//the squares array holding your board's state.
const Square = ({ value, onSquareClick }) =>{
  return <button className="square" onClick={onSquareClick}> {value} </button>;
}
 const Board = ({ xIsNext, squares, onPlay}) => {
  //sets the first move to be X by default and keeps track of that.
 // const [xIsNext, setXIsNext] = useState(true);


  //creates an array with nine elements and sets each of them to null
  //each entry in the array corresponds to the value of a square.
//  const [squares, setSquares] = useState(Array(9).fill(null));

  //Updates the squares array holding the board's state.
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //slice() Array medthod creates a copy of the squares array
    const nextSquares = squares.slice();
  //Each time a player moves xIsNext boolean will be flipped to determine which player goes next
  // and the game state will be saved. The handleClick function will flip the value
  //of xIsNext
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "O";
    }
 //   setSquares(nextSquares);
  //  setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

//Status section helps the player to know when the game is over or
// if the game is still on to show which player is next
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'x' : 'O');
  }
  
  return (
  <>
  <div className="board-row">

 <div className="status">{status}</div>
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square  value={squares[1]} onSquareClick={() => handleClick(1)} />
  <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  </div>

  <div clssName="board-row">
  <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  <Square value={squares[5]} onSquareClick={() => handleClick(5)} />


  </div>

  <div className="board-row">
  <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  <Square value={squares[8]} onSquareClick={() => handleClick(8)} />


  </div>

  
  </>

  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[history.length -1];

  function handlePlay(nextSquares) {

    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}

//takes an array of 9 squares and checks for a winner and return "X" "0" or null
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}