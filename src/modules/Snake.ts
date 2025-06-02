class Snake {
  head: HTMLElement; //蛇头
  bodies: HTMLCollection; //蛇身体，包括蛇头
  element: HTMLElement; //蛇的容器

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.bodies = this.element.getElementsByTagName('div');
  }

  //获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  //设置"蛇头"的坐标
  set X(value) {
    if (this.X === value) return;
    // X值的合法范围是[0,290]， 到这说明 蛇撞墙了
    if (value < 0 || value > 290) throw new Error('🐍 Hit the wall');
    // 如果当前掉头了，让蛇向反方向继续移动：
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value > this.X) {
        //新值value>旧值X：说明掉头后 蛇在向➡️走， 应该让蛇继续向⬅️走：
        value = this.X - 10;
      } else {
        //新值value<旧值X：说明掉头后 蛇在向⬅️走， 应该让蛇继续向➡️走：
        value = this.X + 10;
      }
    }

    //移动蛇身和蛇头
    this.moveBody();
    this.head.style.left = `${value}px`;

    this.checkIsEatSelf();
  }

  set Y(value) {
    if (this.Y === value) return;
    // Y值的合法范围是[0,290] 到这说明 蛇撞墙了
    if (value < 0 || value > 290) throw new Error('🐍 Hit the wall');
    // 竖直方向上不能掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        //新值value>旧值Y：说明掉头后 蛇在向⬇️走， 应该让蛇继续向⬆️走：
        value = this.Y - 10;
      } else {
        //新值value<旧值Y：说明掉头后 蛇在向⬆️走， 应该让蛇继续向⬇️走：
        value = this.Y + 10;
      }
    }

    //移动蛇身和蛇头
    this.moveBody();
    this.head.style.top = `${value}px`;

    this.checkIsEatSelf();
  }

  //蛇增加身体
  increaseBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>');
  }

  //蛇身体移动的方法: 将后面的身体 设置为前边身体的 位置， eg: 第3节=第2节的位置，第1节=第蛇头的位置
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取前面身体的位置：
      let prev = this.bodies[i - 1] as HTMLElement;
      let prevX = prev.offsetLeft;
      let prevY = prev.offsetTop;

      (this.bodies[i] as HTMLElement).style.left = `${prevX}px`;
      (this.bodies[i] as HTMLElement).style.top = `${prevY}px`;
    }
  }

  //蛇有没有撞上自己
  checkIsEatSelf() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error('🐍 Eat himself');
      }
    }
  }
}

export default Snake;
