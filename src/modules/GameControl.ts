import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';
// 游戏控制器，控制其他所有类

const enum Direction {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = Direction.ArrowRight;
  isGameOver = false;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);

    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  private keydownHandler(event: KeyboardEvent) {
    const key = event.key;
    if (!this.isValidDirection(key)) return;

    this.direction = event.key;
  }

  run() {
    let x = this.snake.X;
    let y = this.snake.Y;

    switch (this.direction) {
      case Direction.ArrowUp:
      case Direction.Up:
        y -= 10;
        break;
      case Direction.ArrowDown:
      case Direction.Down:
        y += 10;
        break;
      case Direction.ArrowLeft:
      case Direction.Left:
        x -= 10;
        break;
      case Direction.ArrowRight:
      case Direction.Right:
        x += 10;
        break;
      default:
        return;
    }

    this.checkEat(x, y);

    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (err: any) {
      alert(`${err.message} - Game Over`);
      this.isGameOver = true;
    }

    // 级别越高, 速度越快
    if (this.isGameOver === false) {
      setTimeout(this.run.bind(this), 300 - this.scorePanel.level * 30);
    }
  }

  checkEat(x: number, y: number) {
    console.log('x, y', x, y);
    console.log('food', this.food.X, this.food.Y);
    if (x === this.food.X && y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.increaseBody();
    }
  }

  private isValidDirection(key: string) {
    switch (key) {
      case Direction.ArrowDown:
      case Direction.ArrowLeft:
      case Direction.ArrowRight:
      case Direction.ArrowUp:
      case Direction.Down:
      case Direction.Left:
      case Direction.Right:
      case Direction.Up:
        return true;
    }
    return false;
  }
}

export default GameControl;
