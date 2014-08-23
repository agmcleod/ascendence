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

    this.body.setVelocity(6, 10);
    this.body.setFriction(0.4,0);

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

  collisionHandler : function (response) {
    if (response.overlapN.y !== 0) {
        this.body.vel.y = 0;
    }
  },

  update: function (delta) {
    if (me.input.isKeyPressed("left")) {
      this.body.vel.x -= this.body.accel.x;
      this.flipX(false);
    }

    if (me.input.isKeyPressed("right")) {
      this.body.vel.x += this.body.accel.x;
      this.flipX(true);
    }

    this.body.update();

    me.collision.check(this, true, this.collisionHandler.bind(this), true);

    if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
      this._super(me.Entity, "update", [delta]);
      return true;
    }
    else {
      return false;
    }
  }
});