export function handleLine(line: number[]): number[] {
  const noZeroLine = line.filter((num) => num !== 0);
  const mergedLine: number[] = [];
  for (let i = 0; i < noZeroLine.length; i++) {
    if (i < noZeroLine.length - 1 && noZeroLine[i] === noZeroLine[i + 1]) {
      mergedLine.push(noZeroLine[i] * 2);
      i++;
    } else {
      mergedLine.push(noZeroLine[i]);
    }
  }
  const newLine = [...mergedLine];
  while (newLine.length < 4) {
    newLine.push(0);
  }
  return newLine;
}

export function transposeMatrix(matrix: number[][]): number[][] {
  const transposed: number[][] = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transposed[i] = [];
    for (let j = 0; j < matrix.length; j++) {
      transposed[i][j] = matrix[j][i];
    }
  }
  return transposed;
}

export function move(
  matrix: number[][],
  direction: 'left' | 'right' | 'up' | 'down'
): number[][] {
  let board = matrix;
  if (direction === 'right') {
    board = board.map((row) => row.reverse());
  } else if (direction === 'up') {
    board = transposeMatrix(board);
  } else if (direction === 'down') {
    board = transposeMatrix(board).map((row) => row.reverse());
  }

  const newBoard: number[][] = [];
  for (let r = 0; r < board.length; r++) {
    newBoard.push(handleLine(board[r]));
  }

  if (direction === 'right') {
    for (let r = 0; r < newBoard.length; r++) {
      newBoard[r] = newBoard[r].reverse();
    }
  } else if (direction === 'up') {
    return transposeMatrix(newBoard);
  } else if (direction === 'down') {
    return transposeMatrix(newBoard.map((row) => row.reverse()));
  }
  return newBoard;
}

export function getTransitionTargetInLine(
  oldLine: number[],
  newLine: number[]
): { from: number; to: number }[] {
  let accumulate = 0;
  let cursor = 0;
  const results: { from: number; to: number }[] = [];
  for (let i = 0; i < oldLine.length; i++) {
    const value = oldLine[i];
    if (value === 0) continue;

    accumulate += +value;
    if (accumulate > newLine[cursor]) {
      accumulate = +value;
      cursor++;
    }
    results.push({ from: i, to: cursor });
  }
  return results;
}

export function getTransitionTargets(params: {
  oldBoard: number[][];
  newBoard: number[][];
  direction: 'left' | 'right' | 'up' | 'down';
}): { col: number; row: number; targetCol: number; targetRow: number }[] {
  const { oldBoard, newBoard, direction } = params;
  const size = oldBoard.length;
  const results: {
    col: number;
    row: number;
    targetCol: number;
    targetRow: number;
  }[] = [];
  if (direction === 'left') {
    for (let r = 0; r < size; r++) {
      const transitions = getTransitionTargetInLine(oldBoard[r], newBoard[r]);
      transitions.forEach((t) => {
        results.push({ row: r, col: t.from, targetRow: r, targetCol: t.to });
      });
    }
  }
  if (direction === 'right') {
    for (let r = 0; r < size; r++) {
      const transitions = getTransitionTargetInLine(
        oldBoard[r].slice().reverse(),
        newBoard[r].slice().reverse()
      );
      transitions.forEach((t) => {
        results.push({
          row: r,
          col: size - 1 - t.from,
          targetRow: r,
          targetCol: size - 1 - t.to,
        });
      });
    }
  }
  if (direction === 'up') {
    for (let c = 0; c < size; c++) {
      const oldLine = new Array<number>(size)
        .fill(0)
        .map((_, r) => oldBoard[r][c]);
      const newLine = new Array<number>(size)
        .fill(0)
        .map((_, r) => newBoard[r][c]);
      const transitions = getTransitionTargetInLine(oldLine, newLine);
      transitions.forEach((t) => {
        results.push({ row: t.from, col: c, targetRow: t.to, targetCol: c });
      });
    }
  }
  if (direction === 'down') {
    for (let c = 0; c < size; c++) {
      const oldLine = new Array<number>(size)
        .fill(0)
        .map((_, r) => oldBoard[r][c])
        .reverse();
      const newLine = new Array<number>(size)
        .fill(0)
        .map((_, r) => newBoard[r][c])
        .reverse();
      const transitions = getTransitionTargetInLine(oldLine, newLine);
      transitions.forEach((t) => {
        results.push({
          row: size - 1 - t.from,
          col: c,
          targetRow: size - 1 - t.to,
          targetCol: c,
        });
      });
    }
  }
  return results;
}

export function getEmptyPositions(board: number[][]): [number, number][] {
  const emptyPositions: [number, number][] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }
  return emptyPositions;
}

export function hasAdjacentMatches(matrix: number[][]): boolean {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length - 1; j++) {
      // Nếu hai ô cạnh nhau bằng nhau và không phải là ô trống
      if (matrix[i][j] !== 0 && matrix[i][j] === matrix[i][j + 1]) {
        return true;
      }
    }
  }
  return false;
}

export function isGameOver(grid: number[][]): boolean {
  // 1. Nếu vẫn còn ô trống thì chưa game over
  if (getEmptyPositions(grid).length > 0) return false;

  // 2. Nếu không còn ô trống, kiểm tra xem có cặp nào gộp được không
  const hasHorizontalMatch = hasAdjacentMatches(grid);
  const hasVerticalMatch = hasAdjacentMatches(transposeMatrix(grid));

  return !hasHorizontalMatch && !hasVerticalMatch;
}
