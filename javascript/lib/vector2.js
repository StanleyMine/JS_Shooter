/** 
 * properties
 * x float
 * y float
 * angle float in degrees
 * magnitude
 */

/** 
 * methods
 * add(x, y) does not modify, returns a new vector
 * add(vector) does not modify, returns a new vector
 * subtract(x, y) does not modify, returns a new vector
 * subtract(vector) does not modify, returns a new vector
 * multiply(a) does not modify, returns a new vector
 * divide(a) does not modify, returns a new vector
 * angleTo(vector) returns angle to another vector
 * distanceTo(vector) returns distance to another vector
 */

class Vector2
{
  constructor(x = 0, y = 0)
  {
    this.x = x;
    this.y = y;
  }

  get angle()
  {
    return Math.atan2(this.y, this.x) / Math.PI * 180;
  }

  set angle(value)
  {
    let magnitude = this.magnitude;
    value *= Math.PI / 180; 

    this.y = Math.sin(value) * magnitude;
    this.x = Math.cos(value) * magnitude;
  }

  get magnitude()
  {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set magnitude(value)
  {
    if(this.magnitude == 0) {
      this.x = value;
      return;
    }

    this.normalize();

    this.x *= value;
    this.y *= value;
  }

  /**
   * x can be a Vector2 or float
   * y is an optional float
   * 
   * returns a new vector2
   */
  add(x, y)
  {
    let result = new Vector2(this.x, this.y);

    if(x.__proto__.constructor == Vector2) {
      let vector = x;

      x = vector.x;
      y = vector.y;
    }

    result.x += x;
    result.y += y;

    return result;
  }

  /**
   * x can be a Vector2 or float
   * y is an optional float
   * 
   * returns a new vector2
   */
  subtract(x, y)
  {
    let result = new Vector2(this.x, this.y);

    if(x.__proto__.constructor == Vector2) {
      let vector = x;

      x = vector.x;
      y = vector.y;
    }

    result.x -= x;
    result.y -= y;

    return result;
  }

  /**
   * a is a float
   * 
   * returns a new vector2
   */
  multiply(a)
  {
    let result = new Vector2(this.x, this.y);

    result.x *= a;
    result.y *= a;

    return result;
  }

  /**
   * a is a float
   * 
   * returns a new vector2
   */
  divide(a)
  {
    let result = new Vector2(this.x, this.y);

    result.x /= a;
    result.y /= a;

    return result;
  }

  // modifies this vector2!
  normalize()
  {
    let magnitude = this.magnitude;
  
    if(magnitude != 0) {
      this.x = this.x / magnitude;
      this.y = this.y / magnitude;
    }
  }

  // returns a new vector2
  normalized()
  {
    let magnitude = this.magnitude;
    let result;
  
    if(magnitude != 0) {
      result.x = this.x / magnitude;
      result.y = this.y / magnitude;
    }
    
    return result;
  }

  angleTo(vector)
  {
    let differenceX = vector.x - this.x;
    let differenceY = vector.y - this.y;

    return Math.atan2(differenceY, differenceX) / Math.PI * 180;
  }

  distanceTo(vector)
  {
    let differenceX = vector.x - this.x;
    let differenceY = vector.y - this.y;

    return Math.sqrt(differenceX ** 2 + differenceY ** 2)
  }
}

export default Vector2;