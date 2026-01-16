export interface Cell {
  row: number;
  col: number;
  isMine: boolean; // Có mìn hay không
  isRevealed: boolean; // Đã mở chưa
  isFlagged: boolean; // Đã cắm cờ chưa
  neighborMines: number; // Số mìn xung quanh (0-8)
}
