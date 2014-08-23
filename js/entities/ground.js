game.Ground = me.Entity.extend({
  init: function () {
    this._super(me.Entity, "init", [0, game.GROUND_Y, {
      width: me.game.viewport.width,
      height: me.game.viewport.height - game.GROUND_Y
    }]);

    this.body.addShape(new me.PolyShape(
      0, 0,
      [
        new me.Vector2d(), new me.Vector2d(this.width, 0),
        new me.Vector2d(this.width, this.height), new me.Vector2d(0, this.height)
      ]
    ));
    this.body.collisionType = me.collision.types.WORLD_SHAPE;
  }
});