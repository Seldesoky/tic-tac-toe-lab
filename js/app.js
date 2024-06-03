//1) Define the required variables used to track the state of the game.
// DONE //

//2) Store cached element references.
// DONE //

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.
// DONE //

//4) The state of the game should be rendered to the user.
// DONE //

//5) Define the required constants.
// DONE //

//6) Handle a player clicking a square with a `handleClick` function.
// DONE //

//7) Create Reset functionality.
// DONE //

//_____________________________________________________________________________//
/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  
  let board;
  let turn;
  let winner;
  let tie;
  
  /*------------------------ Cached Element References ------------------------*/
  
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.getElementById('message');
  const resetBtnEl = document.getElementById('reset');
  
  /*-------------------------------- Functions --------------------------------*/
  
  function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard() {
    board.forEach((mark, index) => {
      squareEls[index].textContent = mark;
    });
  }
  
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `Congratulations! ${turn} wins!`;
    } else if (tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `It's ${turn}'s turn`;
    }
  }
  
  function handleClick(evt) {
    const sqIdx = parseInt(evt.target.id);
  
    if (board[sqIdx] !== '' || winner) return;
  
    placePiece(sqIdx);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  function placePiece(idx) {
    board[idx] = turn;
  }
  
  function checkForWinner() {
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
  }
  
  function checkForTie() {
    if (!winner && board.every(cell => cell !== '')) {
      tie = true;
    }
  }
  
  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
  }
  
  /*----------------------------- Event Listeners -----------------------------*/
  
  squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);
  
  // Initialize the game state when the page loads//
  init();
  