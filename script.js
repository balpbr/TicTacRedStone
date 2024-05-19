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
        const img = document.createElement('img');
        img.src = currentPlayer === 'x' ? 'images/x.png' : 'images/o.png';
        cell.appendChild(img);
        cell.classList.add(currentPlayer);
        const winPattern = checkWin(currentPlayer);
        if (winPattern) {
          setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
          drawWinningLine(winPattern);
          setTimeout(() => {
            resetBoard();
            removeWinningLine();
          }, 2000);
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
    for (const pattern of winPatterns) {
      if (pattern.every(index => boardState[index] === player)) {
        return pattern;
      }
    }
    return null;
  }

  function drawWinningLine(pattern) {
    const line = document.createElement('div');
    line.classList.add('line');
    const cell0 = cells[pattern[0]];
    const cell2 = cells[pattern[2]];
    const rect0 = cell0.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();

    const midX0 = rect0.left + rect0.width / 2;
    const midY0 = rect0.top + rect0.height / 2;
    const midX2 = rect2.left + rect2.width / 2;
    const midY2 = rect2.top + rect2.height / 2;

    const angle = Math.atan2(midY2 - midY0, midX2 - midX0) * 180 / Math.PI;

    line.style.width = `${Math.hypot(midX2 - midX0, midY2 - midY0)}px`;
    line.style.top = `${(midY0 + midY2) / 2}px`;
    line.style.left = `${(midX0 + midX2) / 2}px`;
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    board.appendChild(line);
  }

  function removeWinningLine() {
    const line = document.querySelector('.line');
    if (line) {
      line.remove();
    }
  }

  function resetBoard() {
    boardState.fill(null);
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x');
      cell.classList.remove('o');
      cell.innerHTML = ''; // Limpa as imagens
    });
  }
});
