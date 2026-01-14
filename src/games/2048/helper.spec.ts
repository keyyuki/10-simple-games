import { move, getTransitionTargetInLine } from './helper';

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

describe('getTransitionTargetInLine function', () => {
  it('should return correct transition targets 1', () => {
    const oldLine = [2, 2, 4, 0];
    const newLine = [4, 4, 0, 0];
    const expected = [
      { from: 0, to: 0 },
      { from: 1, to: 0 },
      { from: 2, to: 1 },
    ];
    const result = getTransitionTargetInLine(oldLine, newLine);
    expect(result).toEqual(expected);
  });

  it('should return correct transition targets 2', () => {
    const oldLine = [2, 0, 4, 0];
    const newLine = [2, 4, 0, 0];
    const expected = [
      { from: 0, to: 0 },
      { from: 2, to: 1 },
    ];
    const result = getTransitionTargetInLine(oldLine, newLine);
    expect(result).toEqual(expected);
  });

  it('should return correct transition targets 3', () => {
    const oldLine = [2, 4, 2, 0];
    const newLine = [2, 4, 2, 0];
    const expected = [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
      { from: 2, to: 2 },
    ];
    const result = getTransitionTargetInLine(oldLine, newLine);
    expect(result).toEqual(expected);
  });
  it('should return correct transition targets 4', () => {
    const oldLine = [4, 2, 0, 0];
    const newLine = [4, 2, 0, 0];
    const expected = [
      { from: 0, to: 0 },
      { from: 1, to: 1 },
    ];
    const result = getTransitionTargetInLine(oldLine, newLine);
    expect(result).toEqual(expected);
  });
});
