import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Logs from "./components/Logs";
import {WINNING_COMBINATIONS} from "./components/WINNING_COMBINATIONS";
import GameOver from "./components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns){
    let currPlayer = "X";
    if (turns.length > 0 && turns[0].player === "X") {
      currPlayer = "O";
    }
    return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players,setPlayerName]=useState({'X':'Player 1','O':'Player 2'});
  const activePlayer=deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((ele)=>[...ele])];
  let winner=null;

  for (const turn of gameTurns) {
    const coord = turn.square;
    gameBoard[coord.row][coord.col] = turn.player;
  }

  for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol==secondSquareSymbol && firstSquareSymbol==thirdSquareSymbol){
        winner=players[firstSquareSymbol];
      }
  }

  const hasDraw=gameTurns.length===9 && !winner; 

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleNameChange(symbol,newName){
      setPlayerName(prevPlayers=>{
          return {...prevPlayers,[symbol]:newName};
      });
  };

  function handleRematch(){
      setGameTurns([]);
      winner=null;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer==='X'}
            onNameChange={handleNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer==='O'}
            onNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        Game-Board
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  );
}

export default App;
