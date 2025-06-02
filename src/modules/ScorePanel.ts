class ScorePanel {
  // 用来记录分数和等级
  score = 0;
  level = 0;
  // score, level所在的元素
  scoreSpan: HTMLElement;
  levelSpan: HTMLElement;

  // 设置一个变量限制等级
  maxLevel: number;
  // 设置一个变量表示每多少分 升1级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreSpan = document.getElementById('score')!;
    this.levelSpan = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.score++;
    this.scoreSpan.innerHTML = this.score.toString();

    //分数是整10倍的时候 会level up
    if (this.score % this.upScore === 0) {
      this.addLevel();
    }
  }

  addLevel() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelSpan.innerHTML = this.level.toString();
    }
  }
}

export default ScorePanel;
