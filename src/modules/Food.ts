class Food {
  //定义一个属性，表示食物所对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素 并将其赋值给element
    this.element = document.getElementById('food')!;
  }

  // 获取食物x轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 获取食物y轴坐标的方法
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    /**
     * 生成一个随机位置，食物的位置最小是0，最大是290
     * 蛇移动一次就是一格，一格的大小就是10， 所以要求食物坐标必须是整10
     */
    const randomX = Math.floor(Math.random() * 30) * 10;
    const randomY = Math.floor(Math.random() * 30) * 10;
    this.element.style.left = `${randomX}px`;
    this.element.style.top = `${randomY}px`;
  }
}

export default Food;
