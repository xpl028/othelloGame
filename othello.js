class OthelloPattern {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

  }

  move(x, y, color, checkOnly = false) {
    let ox = x;
    let oy = y;
    let canMove = false;

    let directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    // 点击了有棋子的区域直接return
    if (this.board[y][x] !== 0) {
      return false;
    }

    for (let direction of directions) {
      x = ox;
      y = oy;
      let hasOpposite = false;
      let directionCanMove = false;

      // 边界控制
      while(true) {
        x += direction[0];
        y += direction[1];

        if (x < 0 || x >= 8 || y < 0 || y >= 8) {
          break;
        }
        // 有白色棋子
        if (this.board[y][x] === 3 - color) {
          hasOpposite = true;
        }
        // 有黑白棋子
        if (this.board[y][x] === color) {
          if (hasOpposite) {
            directionCanMove = true;
          }
          break;
        }
        if (this.board[y][x] === 0) {
          break;
        }
      }

      if (directionCanMove && !checkOnly) {
        while(true) {
          x -= direction[0];
          y -= direction[1];

          if (x === ox && y === oy) {
            break;
          }
          
          this.board[y][x] = color;
        }
      }
      canMove = canMove || directionCanMove;
    }

    // 可以吃掉对方棋子
    if (canMove && !checkOnly) {
      // 遍历把对方棋子变为己方棋子
      this.board[oy][ox] = color;
      color = 3 - color;
    }

    return canMove;
  }
}

class OthelloGame {
  constructor() {
    this.color = 1;
    this.pattern = new OthelloPattern();
  }

  checkPass() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.pattern.move(x, y, this.color, true)) {
          return false;
        }
      }
    }
    return true;
  }

  move(x, y) {
    this.pattern.move(x, y, this.color);
    this.color = 3 - this.color;

    if (this.checkPass()) {
      this.color = 3 - this.color;

      if (this.checkPass()) {
        alert('game Over');
      }
    }
  }
}
