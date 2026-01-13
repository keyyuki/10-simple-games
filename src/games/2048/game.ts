import {
  getEmptyPositions,
  handleLine,
  hasAdjacentMatches,
  isGameOver,
  transposeMatrix,
  move,
} from './helper';

interface Tile {
  value: number;
  row: number; // Vị trí logic trên lưới (0-3)
  col: number; // Vị trí logic trên lưới (0-3)
  x: number; // Tọa độ pixel hiện tại trên Canvas
  y: number; // Tọa độ pixel hiện tại trên Canvas
  targetX: number; // Tọa độ pixel đích cần tới
  targetY: number; // Tọa độ pixel đích cần tới
  isMerging?: boolean; // Hiệu ứng phóng to khi gộp
}

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Đặt kích thước cho canvas
canvas.width = 400;
canvas.height = 400;

ctx.font = 'bold 40px Arial';
ctx.fillStyle = 'black'; // Màu của chữ

ctx.textAlign = 'center'; // Căn giữa theo trục X
ctx.textBaseline = 'middle'; // Căn giữa theo trục Y

class Game2048 {
  private tiles: Tile[] = [];
  private size = 4;
  private canvasSize = 400;
  private padding = 10;
  private tileSize = 87.5; // (400 - 5*10) / 4
  private isAnimating = false;

  private nextMatrix: number[][] = [];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.initGame();
  }

  // Khởi tạo 2 ô đầu tiên
  private initGame() {
    this.addRandomTile();
    this.addRandomTile();
    this.draw();

    window.addEventListener('keydown', (e) => {
      if (this.isAnimating) return; // Khóa input khi đang diễn hoạt

      switch (e.key) {
        case 'ArrowUp':
          this.move('up');
          break;
        case 'ArrowDown':
          this.move('down');
          break;
        case 'ArrowLeft':
          this.move('left');
          break;
        case 'ArrowRight':
          this.move('right');
          break;
      }
    });

    this.gameLoop();
  }

  private addRandomTile() {
    const emptyPositions = getEmptyPositions(this.getBoardMatrix());
    if (emptyPositions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyPositions.length);
    const [row, col] = emptyPositions[randomIndex];
    const newValue = Math.random() < 0.9 ? 2 : 4;

    this.tiles.push({
      value: newValue,
      row,
      col,
      x: this.padding + col * (this.tileSize + this.padding),
      y: this.padding + row * (this.tileSize + this.padding),
      targetX: this.padding + col * (this.tileSize + this.padding),
      targetY: this.padding + row * (this.tileSize + this.padding),
    });
  }

  private getBoardMatrix(): number[][] {
    const matrix: number[][] = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
    this.tiles.forEach((tile) => {
      matrix[tile.row][tile.col] = tile.value;
    });
    return matrix;
  }

  public move(direction: 'left' | 'right' | 'up' | 'down') {
    if (this.isAnimating) return;

    let board = this.getBoardMatrix();
    const newBoard = move(board, direction);
    board = newBoard;

    // Cập nhật vị trí mục tiêu cho từng tile
    this.tiles.forEach((tile) => {
      const newRowCol = this.findTileNewPosition(tile, board, direction);
      tile.row = newRowCol[0];
      tile.col = newRowCol[1];
      tile.targetX = this.padding + tile.col * (this.tileSize + this.padding);
      tile.targetY = this.padding + tile.row * (this.tileSize + this.padding);
    });

    this.isAnimating = true;
    this.nextMatrix = board;
  }

  private findTileNewPosition(
    tile: Tile,
    board: number[][],
    direction: 'left' | 'right' | 'up' | 'down'
  ): [number, number] {
    const size = this.size;
    let row = tile.row;
    let col = tile.col;
    const value = tile.value;

    if (direction === 'left') {
      for (let c = 0; c < size; c++) {
        if (board[row][c] === value || board[row][c] === 2 * value) {
          return [row, c];
        }
      }
    } else if (direction === 'right') {
      for (let c = size - 1; c >= 0; c--) {
        if (board[row][c] === value || board[row][c] === 2 * value) {
          return [row, c];
        }
      }
    } else if (direction === 'up') {
      for (let r = 0; r < size; r++) {
        if (board[r][col] === value || board[r][col] === 2 * value) {
          return [r, col];
        }
      }
    } else if (direction === 'down') {
      for (let r = size - 1; r >= 0; r--) {
        if (board[r][col] === value || board[r][col] === 2 * value) {
          return [r, col];
        }
      }
    }

    return [tile.row, tile.col]; // Không tìm thấy vị trí mới
  }

  private update() {
    let moved = false;
    const speed = 0.2; // Tốc độ di chuyển

    this.tiles.forEach((tile) => {
      const targetX = this.padding + tile.col * (this.tileSize + this.padding);
      const targetY = this.padding + tile.row * (this.tileSize + this.padding);

      if (
        Math.abs(tile.x - targetX) > 0.1 ||
        Math.abs(tile.y - targetY) > 0.1
      ) {
        tile.x += (targetX - tile.x) * speed;
        tile.y += (targetY - tile.y) * speed;
        moved = true;
      } else {
        tile.x = targetX;
        tile.y = targetY;
      }
    });

    if (moved) {
      this.isAnimating = true;
    } else {
      if (this.isAnimating) {
        // Sau khi di chuyển xong, xử lý gộp thực sự và sinh ô mới
        this.finalizeMove();
      }
      this.isAnimating = false;
    }
  }

  private draw() {
    // 1. Xóa canvas
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);

    // 2. Vẽ nền bàn cờ
    this.ctx.fillStyle = '#bbada0';
    this.ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);

    // 3. Vẽ từng Tile
    this.tiles.forEach((tile) => {
      // Vẽ ô vuông
      this.ctx.fillStyle = this.getTileColor(tile.value);
      this.ctx.fillRect(tile.x, tile.y, this.tileSize, this.tileSize);

      // Vẽ số
      this.ctx.fillStyle = tile.value <= 4 ? '#776e65' : 'white';
      this.ctx.font = 'bold 30px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        tile.value.toString(),
        tile.x + this.tileSize / 2,
        tile.y + this.tileSize / 2
      );
    });
  }

  private finalizeMove() {
    const newTiles: Tile[] = [];
    const board = this.nextMatrix;
    const mergeBoard: number[][] = [];

    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const value = board[r][c];
        if (value !== 0) {
          newTiles.push({
            value,
            row: r,
            col: c,
            x: this.padding + c * (this.tileSize + this.padding),
            y: this.padding + r * (this.tileSize + this.padding),
            targetX: this.padding + c * (this.tileSize + this.padding),
            targetY: this.padding + r * (this.tileSize + this.padding),
          });
        }
      }
    }

    this.tiles = newTiles;
    this.addRandomTile();

    if (isGameOver(this.getBoardMatrix())) {
      alert('Game Over!');
    }
  }

  // Vòng lặp chính
  public gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }

  private getTileColor(value: number): string {
    const colors: { [key: number]: string } = {
      2: '#eee4da',
      4: '#ede0c8',
      8: '#f2b179',
      16: '#f59563',
      32: '#f67c5f',
      64: '#f65e3b',
      128: '#edcf72',
      256: '#edcc61',
      512: '#edc850',
      1024: '#edc53f',
      2048: '#edc22e',
    };
    return colors[value] || '#3c3a32';
  }
}
new Game2048(ctx);
