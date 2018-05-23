import Input from "./input.js";
import Vector2 from "./vector2.js";

class Game
{
  constructor(canvas)
  {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.input = new Input(this.canvas);
    this.camera = new Vector2();

    this.resizeCanvas();

    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas()
  {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  requestAnimationFrame()
  {
    requestAnimationFrame(() => this.internalUpdate());
  }

  loop()
  {
    requestAnimationFrame(() => this.loop());

    this.update();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);
    this.render();
    this.ctx.restore();

    this.renderStatic();

    this.input.update();
  }

  update()
  { }

  render()
  { }

  renderStatic()
  { }
}

export default Game;
