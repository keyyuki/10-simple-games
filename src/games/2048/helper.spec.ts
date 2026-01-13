import { move } from './helper';

describe('move function', () => {
  it('should move left correctly', () => {
    const board = [
      [2, 2, 4, 0],
      [4, 0, 4, 4],
      [2, 2, 2, 2],
      [0, 0, 2, 2],
    ];
    const expected = [
      [4, 4, 0, 0],
      [8, 4, 0, 0],
      [4, 4, 0, 0],
      [4, 0, 0, 0],
    ];
    const result = move(board, 'left');
    expect(result).toEqual(expected);
  });

  it('should move right correctly', () => {
    const board = [
      [2, 2, 4, 0],
      [4, 0, 4, 4],
      [2, 2, 2, 2],
      [0, 0, 2, 2],
    ];
    const expected = [
      [0, 0, 4, 4],
      [0, 0, 4, 8],
      [0, 0, 4, 4],
      [0, 0, 0, 4],
    ];
    const result = move(board, 'right');
    expect(result).toEqual(expected);
  });

  it('should move up correctly', () => {
    const board = [
      [2, 2, 4, 0],
      [4, 0, 4, 4],
      [2, 2, 2, 2],
      [0, 0, 2, 2],
    ];
    const expected = [
      [2, 4, 8, 4],
      [4, 0, 4, 4],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = move(board, 'up');
    expect(result).toEqual(expected);
  });

  it('should move down correctly', () => {
    const board = [
      [2, 2, 4, 0],
      [4, 0, 4, 4],
      [2, 2, 2, 2],
      [0, 0, 2, 2],
    ];
    const expected = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 8, 4],
      [2, 4, 4, 4],
    ];
    const result = move(board, 'down');
    expect(result).toEqual(expected);
  });
});
