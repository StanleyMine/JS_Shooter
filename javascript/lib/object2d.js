"use strict";

/** 
 * properties
 * color string - hex, name of color, similar to css
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

class Object2D
{
  constructor(x = 0, y = 0)
  {
    this.color = "#000000";

    this.position = new Vector2(x, y);
    this.velocity = new Vector2();
    this.friction = 0;
    this.angle = 0;
  }

  get x()
  {
    return this.position.x;
  }

  set x(value)
  {
    this.position.x = value;
  }

  get y()
  {
    return this.position.y;
  }

  set y(value)
  {
    this.position.y = value;
  }

  update()
  {
    this.velocity.x *= 1 - this.friction;
    this.velocity.y *= 1 - this.friction;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  render(ctx)
  {
    throw "no render method";
  }
}