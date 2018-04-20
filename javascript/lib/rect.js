"use strict";

/** 
 * properties
 * color string - hex, name of color, similar to css
 * width float
 * height float
 * left float
 * right float
 * top float
 * bottom float
 * position vector2
 * velocity vector2
 * angle float in degrees
 * friction float - velocity is multiplied by 1 - friction
 *                  0 is no friction
 *                  1 is no movement
 * x float - shorthand for position.y
 * y float - shorthand for position.x
 */

/** 
 * methods
 * update()
 * render(ctx)
 */

class Rect extends Object2D
{
  constructor(x = 0, y = 0)
  {
    super(x, y);
    this.width = 50;
    this.height = 50;
  }

  get left()
  {
    return this.x - this.width / 2;
  }

  set left(value)
  {
    this.x = value + this.width / 2;
  }

  get right()
  {
    return this.x + this.width / 2;
  }

  set right(value)
  {
    this.x = value - this.width / 2;
  }

  get top()
  {
    return this.y - this.height / 2;
  }

  set top(value)
  {
    this.y = value + this.height / 2;
  }

  get bottom()
  {
    return this.y + this.height / 2;
  }

  set bottom(value)
  {
    this.y = value - this.height / 2;
  }

  render(ctx)
  {
    ctx.fillStyle = this.color;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle / 180 * Math.PI);
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}