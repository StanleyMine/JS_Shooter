"use strict";

class RectCollider extends Collider
{
  // owner is an object2d
  constructor(owner, width, height)
  {
    super(owner);
    this.width = width;
    this.height = height;
  }

  get left()
  {
    return this.owner.x - this.width / 2;
  }

  get right()
  {
    return this.owner.x + this.width / 2;
  }

  get top()
  {
    return this.owner.y - this.height / 2;
  }

  get bottom()
  {
    return this.owner.y + this.height / 2;
  }

  intersectsRect(collider)
  {
    return this.left < collider.right &&
           this.right > collider.left &&
           this.top < collider.bottom &&
           this.bottom > collider.top;
  }

  intersectsPoint(vector)
  {
    return vector.x > this.left && vector.x < this.right &&
           vector.y > this.top && vector.y < this.bottom;
  }

  intersectsSide(collider)
  {
    if(!this.intersectsRect(collider))
      return "none";

    let combinedWidth = this.width + collider.width;
    let combinedHeight = this.height + collider.height;

    let x = (collider.owner.x - this.owner.x) / combinedWidth;
    let y = (collider.owner.y - this.owner.y) / combinedHeight;

    if(Math.abs(x) > Math.abs(y)) {
      if(x > 0)
        return "right";
      if(x < 0)
        return "left";
    } else {
      if(y < 0)
        return "top";
      if(y > 0)
        return "bottom";
    }
  }
}