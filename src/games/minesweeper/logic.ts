import { Cell } from './type';

export function seedBooms(
  size: number,
  boomCount: number,
  safeX: number,
  safeY: number
): [number, number][] {
  const booms = new Set<string>();

  while (booms.size < boomCount) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    // Đảm bảo không đặt mìn ở vị trí an toàn
    if ((row === safeX && col === safeY) || booms.has(`${row},${col}`)) {
      continue;
    }

    booms.add(`${row},${col}`);
  }

  return Array.from(booms).map((pos) => {
    const [row, col] = pos.split(',').map(Number);
    return [row, col];
  });
}

export function createBoard(
  size: number,
  boomPositions: [number, number][]
): Cell[][] {
  const board: Cell[][] = [];
  for (let row = 0; row < size; row++) {
    const boardRow: Cell[] = [];
    for (let col = 0; col < size; col++) {
      const isMine = boomPositions.some(
        ([boomRow, boomCol]) => boomRow === row && boomCol === col
      );
      boardRow.push({
        row,
        col,
        isMine,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      });
    }
    board.push(boardRow);
  }

  // Tính số mìn xung quanh cho mỗi ô
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col].isMine) continue;

      let mineCount = 0;
      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (
          newRow >= 0 &&
          newRow < size &&
          newCol >= 0 &&
          newCol < size &&
          board[newRow][newCol].isMine
        ) {
          mineCount++;
        }
      }
      board[row][col].neighborMines = mineCount;
    }
  }

  return board;
}
