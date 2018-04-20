"use strict";

// this class extends Object2D, so it has physics just like Rect

/** 
 * properties
 * text string to display
 * font - lookup canvas font
 * textBasline - lookup canvas textBaseline
 * textAlign - lookup canvas textAlign
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

class Text extends Object2D
{
  constructor(text, x, y)
  {
    super(x, y);
    this.text = text;
    this.font = "20px Arial";
    this.textBaseline = "top";
    this.textAlign = "left";
  }

  render(ctx)
  {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textBaseline = this.textBaseline;
    ctx.textAlign = this.textAlign;

    let textSize = ctx.measureText(this.text);

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle / 180 * Math.PI);
    ctx.translate(textSize.width / 2, -textSize.height / 2);
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}