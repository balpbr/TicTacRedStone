document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'x';
  let boardState = Array(9).fill(null);

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const index = cell.getAttribute('data-index');
      if (boardState[index] === null) {
        boardState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
          setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
          resetBoard();
        } else if (boardState.every(cell => cell !== null)) {
          setTimeout(() => alert(`It's a draw!`), 10);
          resetBoard();
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      }
    });
  });

  function checkWin(player) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
      return pattern.every(index => boardState[index] === player);
    });
  }

  function resetBoard() {
    boardState.fill(null);
    cells.forEach(cell => {
      cell.classList.remove('x');
      cell.classList.remove('o');
    });
  }
});
