game.Bullet = me.Entity.extend({
  init: function (x, y, direction) {
    this._super(me.Entity, "init", [x, y, {
      width: 12,
      height: 4
    }]);

    this.body.addShape(new me.PolyShape(
      0, 0,
      [
        new me.Vector2d(), new me.Vector2d(this.width, 0),
        new me.Vector2d(this.width, this.height), new me.Vector2d(0, this.height)
      ]
    ));

    this.renderable = new me.AnimationSheet(0, 0, {
      image: game.atlas.getTexture(),
      spritewidth: this.width,
      spriteheight: this.height,
      region: game.atlas.getRegion("bullet.png")
    });
    this.alwaysUpdate = true;
    this.direction = direction;
    this.body.setVelocity(20, 0);
    this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
  },

  collisionHandler: function (response) {
    if (response.b.body.collisionType !== this.fireType) {
      response.b.takeDamage();
      me.game.world.removeChild(this);
    }
  },

  update: function () {
    if (this.direction === game.Bullet.LEFT) {
      this.body.vel.x -= this.body.accel.x;  
    }
    else {
      this.body.vel.x += this.body.accel.x;
    }
    this.body.update();

    me.collision.check(this, true, this.collisionHandler.bind(this), true);

    if (this.body.vel.x === 0) {
      me.game.world.removeChild(this);
    }

    return true;
  }
});

game.Bullet.LEFT = 0;
game.Bullet.RIGHT = 1;