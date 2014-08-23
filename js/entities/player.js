game.Player = me.Entity.extend({
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

    this.body.setVelocity(6, 15);
    this.body.setFriction(0.4, 0);

    this.renderable = new me.AnimationSheet(0, 0, {
      image: game.atlas.getTexture(),
      spritewidth: this.width,
      spriteheight: this.height,
      region: game.atlas.getRegion("player.png")
    });

    this.renderable.addAnimation("walk", [0,1,2,3,2,1], 40);
    this.renderable.addAnimation("idle", [0], 1);
    this.renderable.setCurrentAnimation("walk");
  },

  collisionHandler: function (response) {
    this.pos.sub(response.overlapV);
    if (response.overlapN.y !== 0) {
      this.body.vel.y = 0;
    }
    this.falling = false;
    this.updateBounds();
  },

  startWalkAnimation: function ()  {
    if (!this.renderable.isCurrentAnimation("walk")) {
      this.renderable.setCurrentAnimation("walk");
    }
  },

  update: function (delta) {
    if (me.input.isKeyPressed("left")) {
      this.body.vel.x -= this.body.accel.x;
      this.flipX(false);
      this.startWalkAnimation();
    }

    if (me.input.isKeyPressed("right")) {
      this.body.vel.x += this.body.accel.x;
      this.flipX(true);
      this.startWalkAnimation();
    }

    if (this.body.vel.x === 0 && !this.renderable.isCurrentAnimation("idle")) {
      this.renderable.setCurrentAnimation("idle");
    }


    if (me.input.isKeyPressed("jump")) {
      this.jumping = true;
      this.body.vel.y -= this.body.maxVel.y;
    }

    me.collision.check(this, true, this.collisionHandler.bind(this), true);
    this.body.update();

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      this._super(me.Entity, "update", [delta]);
      return true;
    }
    else {
      return false;
    }
  }
});