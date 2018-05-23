import Collider from "./collider.js";

class CircleCollider extends Collider
{
  // owner is an object2d
  constructor(owner, radius)
  {
    super(owner);
    this.radius = radius;
  }

  intersectsCircle(collider)
  {
    let distance = this.owner.position.distanceTo(collider.owner.position);
    
    return distance < this.radius + collider.radius;
  }

  intersectsPoint(vector)
  {
    let distance = this.owner.position.DistanceTo(vector);
  
    return distance <= circleA.radius;
  }
}

export default CircleCollider;
