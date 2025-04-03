export function getWinner(board: number[][]): number | null {
  const columns: number[][] = [];

  for (let i = 0; i < 3; i++) {
    const row = board[i];

    if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
      return row[0];
    }

    for (let j = 0; j < 3; j++) {
      columns[j] = columns[j] ?? [];
      columns[j].push(row[j]);
    }
  }

  for (let i = 0; i < 3; i++) {
    const col = columns[i];
    if (col[0] === col[1] && col[1] === col[2] && col[0] !== 0) {
      return col[0];
    }
  }

  if (
    board[0][0] === board[1][1] && board[1][1] === board[2][2] &&
    board[0][0] !== 0
  ) {
    return board[0][0];
  }

  if (
    board[0][2] === board[1][1] && board[1][1] === board[2][0] &&
    board[0][2] !== 0
  ) {
    return board[0][2];
  }

  return null;
}

function availableMoves(board: number[][]): { row: number; col: number }[] {
  const moves: { row: number; col: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === 0) {
        moves.push({ row, col });
      }
    }
  }
  return moves;
}

function minimax(
  board: number[][],
  depth: number,
  isMaximizing: boolean,
): number {
  const winner = getWinner(board);
  if (winner === 1) return 1;
  if (winner === 2) return -1;
  if (winner === null) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves(board)) {
      board[move.row][move.col] = 1;
      bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
      board[move.row][move.col] = 0;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves(board)) {
      board[move.row][move.col] = 2;
      bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
      board[move.row][move.col] = 0;
    }
    return bestScore;
  }
}
export function bestMove(board: number[][]): { row: number; col: number } {
  let bestScore = -Infinity;
  let moves: { row: number; col: number }[] = [];

  for (const m of availableMoves(board)) {
    board[m.row][m.col] = 1;
    if (getWinner(board) === 1) {
      board[m.row][m.col] = 0;
      return { row: m.row, col: m.col };
    }
    board[m.row][m.col] = 0;
  }

  for (const m of availableMoves(board)) {
    board[m.row][m.col] = 2;
    if (getWinner(board) === 2) {
      board[m.row][m.col] = 0;
      return { row: m.row, col: m.col };
    }
    board[m.row][m.col] = 0;
  }

  for (const m of availableMoves(board)) {
    board[m.row][m.col] = 1;
    let score = minimax(board, 0, false);
    board[m.row][m.col] = 0;

    if (score > bestScore) {
      bestScore = score;
      moves = [{ row: m.row, col: m.col }];
    } else if (score === bestScore) {
      moves.push({ row: m.row, col: m.col });
    }
  }

  return moves.length > 0
    ? moves[Math.floor(Math.random() * moves.length)]
    : { row: -1, col: -1 };
}

export function isFilled(board: number[][]): boolean {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === 0) return false;
    }
  }
  return true;
}
