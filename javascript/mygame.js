"use strict";
var EnemiesKilled = 0;
class MyGame extends Game
{
  constructor(canvas)
  {
    super(canvas);

    this.screenbox = new Rect(0,0);
    this.screenbox.collider = new RectCollider(this.screenbox, this.canvas.width, this.canvas.height);
    
    this.player = new Rect(750, 500);
    this.player.friction = .2;
    this.player.color = "blue";
    this.player.collider = new CircleCollider(this.player, this.player.width / 2);
    
    this.enemies = [];
    this.bullets = [];

    this.createEnemies(new Vector2(0,0));
    this.text = new Text("Enemies Killed: " + EnemiesKilled, 1300, 10);
    this.text1 = new Text("Enemies Alive: " + this.enemies.length, 1300, 40);
  }

  update()
  {

    if(this.player.position.x > this.canvas.width){
      this.player.position.x = 0; 
    }
    if(this.player.position.x < 0){
      this.player.position.x = this.canvas.width; 
    }
    if(this.player.position.y > this.canvas.height){
      this.player.position.y = 0;
    }
    if(this.player.position.y < 0){
      this.player.position.y = this.canvas.height;
    }

    // use this for getting keycodes: http://keycode.info/
    
    // move camera arrow keys
    if(this.input.isKeyDown(37))
      this.camera.x -= 0;
    if(this.input.isKeyDown(39))
      this.camera.x += 0;
    if(this.input.isKeyDown(38))
      this.camera.y -= 0;
    if(this.input.isKeyDown(40))
      this.camera.y += 0;

    // move player wasd
    if(this.input.isKeyDown(65))
      this.player.velocity.x -= 1;
    if(this.input.isKeyDown(68))
      this.player.velocity.x += 1;
    if(this.input.isKeyDown(87))
      this.player.velocity.y -= 1;
    if(this.input.isKeyDown(83))
      this.player.velocity.y += 1;

    // fire bullet with space
    if(this.input.wasKeyTapped(32))
      this.createBullet(this.player.position, this.player.angle);

    // make player look at the mouse location
    let mouse = this.input.getMousePosition();
    this.player.angle = this.player.position.angleTo(mouse.add(this.camera));

    // update player physics
    this.player.update();
    this.screenbox.position.x = this.canvas.width / 2 + this.camera.x;
    this.screenbox.position.y = this.canvas.height / 2 + this.camera.y;
    
    this.updateBullets();
    this.text.text = "Enemies Killed: " + EnemiesKilled;
    this.text1.text = "Enemies Alive: " + this.enemies.length;
    this.updateEnemies();
  }

  createEnemies(position)
  {
    let enemy = new Rect(position.x, position.y);
    enemy.color = "red";
    enemy.width = 75;
    enemy.height = 75;
    enemy.collider = new CircleCollider(enemy, enemy.width / 2);
    this.enemies.push(enemy);
    //console.log(enemy.position);
    //console.log(enemy.position.y);
  }
  updateEnemies()
  {
    for(let i = 0; i < this.enemies.length; ++i){
      let enemy = this.enemies[i];
      enemy.update();
      enemy.velocity.magnitude = 2;
      enemy.velocity.angle = enemy.position.angleTo(this.player.position);
      if(enemy.collider.intersectsCircle(this.player.collider))
      {
        this.text.text = "You Lose";
        alert("You have lost the game.");
        EnemiesKilled = 0;
        enemy.position.x = Math.random() * this.canvas.width + this.camera.x;
        enemy.position.y = Math.random() * this.canvas.height + this.camera.y;
      }
    }
  }
  
  respawnEnemy(){
    let offset = new Vector2();
    offset.magnitude = this.canvas.width / 2;
    offset.angle = Math.random() * 360;
    offset = offset.add(this.camera);
    offset.x += this.camera.x + this.canvas.width / 2;
    offset.y += this.camera.y + this.canvas.height / 2;
    this.createEnemies(offset);
  }

  updateBullets()
  {
    let x = 0;
    // prevent problems when we modify during loop
    for(let i = 0; i < this.bullets.length; ++i) {
      let bullet = this.bullets[i];
      bullet.update();
      // delete from the bullets array if collision with the "object" occurred
        for (let j = 0; j < this.enemies.length; ++j){
          let enemy = this.enemies[j];
          if(bullet.collider.intersectsCircle(enemy.collider)) 
          {
            this.bullets.splice(i--, 1);
            this.enemies.splice(j--,1);
            EnemiesKilled += 1;
            
            this.respawnEnemy();
            if(this.enemies.length > 5)
            {return;}
            
            this.respawnEnemy();
          }
        }
        if(!this.screenbox.collider.intersectsPoint(bullet.position))
        {
          this.bullets.splice(i--, 1);
          continue;
        }
    }

    //this.text.text = "living enemies: " + this.bullets.length;
  }
  
  createBullet(position, angle)
  {
    let bullet = new Rect(position.x, position.y);
    bullet.width = 5;
    bullet.height = 15;
    bullet.angle = angle + 90;
    bullet.collider = new CircleCollider(bullet, 10);
  
    bullet.velocity.magnitude = 15;
    bullet.velocity.angle = angle;
    this.bullets.push(bullet);
  }

  render()
  {
    for(let bullet of this.bullets)
      bullet.render(this.ctx);

    for(let enemy of this.enemies)
      enemy.render(this.ctx);
  
    this.player.render(this.ctx);
  }

  renderStatic()
  {
    this.text1.render(this.ctx);
    this.text.render(this.ctx);
  }
}