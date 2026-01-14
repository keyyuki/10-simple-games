export interface Tile {
  value: number;
  row: number; // Vị trí logic trên lưới (0-3)
  col: number; // Vị trí logic trên lưới (0-3)
  x: number; // Tọa độ pixel hiện tại trên Canvas
  y: number; // Tọa độ pixel hiện tại trên Canvas
  targetX: number; // Tọa độ pixel đích cần tới
  targetY: number; // Tọa độ pixel đích cần tới
  isMerging?: boolean; // Hiệu ứng phóng to khi gộp
}
