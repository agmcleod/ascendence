game.Enemy = me.Entity.extend({
  init: function (x, y) {
    this._super(me.Entity, "init", [x, y, {
      width: 32,
      height: 64
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
      region: game.atlas.getRegion("enemies.png")
    });

    this.renderable.addAnimation("walk", [0,1,2,3,2,1], 40);
    this.renderable.addAnimation("idle", [0], 1);
    this.renderable.setCurrentAnimation("walk");

    if (x <= game.middle) {
      this.moveRight = true;
      this.flipX(true);
    }
    else {
      this.moveRight = false;
    }
    this.body.setVelocity(4, 0);
    this.flipY(true);
    this.onTop = true;
    this.health = 3;
  },

  collisionHandler: function (response) {
    switch (response.b.body.collisionType) {
      case me.collision.types.PROJECTILE_OBJECT:
        this.takeDamage();
        break;
      case me.collision.types.WORLD_SHAPE:
        this.pos.sub(response.overlapV);
        if (response.overlapN.y !== 0) {
          this.body.vel.y = 0;
        }
        this.falling = false;
        this.updateBounds();
        break;
    };
  },

  takeDamage: function () {
    this.health--;
    if (this.health <= 0) {
      me.game.world.removeChild(this);
    }
  },

  update: function (delta) {
    this._super(me.Entity, "update", [delta]);
    if (this.moveRight) {
      this.body.vel.x += this.body.accel.x;
    }
    else {
      this.body.vel.x -= this.body.accel.x; 
    }

    me.collision.check(this, true, this.collisionHandler.bind(this), true);

    this.body.update();

    if (this.onTop && this.pos.x >= game.middle - this.width && this.pos.x <= game.middle + this.width) {
      this.renderable.setCurrentAnimation("idle");
      this.body.setVelocity(0, 10);
      this.onTop = false;
    }
    else if (!this.onTop && !this.onBottom) {
      if (this.pos.y >= 250) {
        this.flipY(false);
      }
    }

    return true;
  }
});