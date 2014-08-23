game.PlayScreen = me.ScreenObject.extend({
  bindEvents: function () {
    me.input.bindKey(me.input.KEY.A, "left");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.D, "right");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.SPACE, "jump", true);
    me.input.bindKey(me.input.KEY.UP, "jump", true);
    me.input.bindKey(me.input.KEY.DIVIDE, "shoot", true);
    me.input.bindPointer(me.input.KEY.DIVIDE);
    me.input.bindPointer(me.input.mouse.RIGHT, me.input.KEY.DIVIDE);
  },

  onResetEvent: function() {
    var background = new me.Sprite(0, 0, game.atlas.getTexture(), 960, 640);
    var region = game.atlas.getRegion("background.png");
    background.offset.setV(region.offset);
    me.game.world.addChild(background, 1);

    var beam = new me.AnimationSheet(464, 152, {
      image: game.atlas.getTexture(),
      spritewidth: 27,
      spriteheight: 335,
      region: game.atlas.getRegion("beam.png")
    });

    me.game.world.addChild(beam, 2);
    
    this.spawnEnemy();
    var _this = this;
    me.timer.setInterval(function () {
      _this.spawnEnemy();
    }, 400);
    
    this.player = new game.Player(200, game.GROUND_Y - 80);
    me.game.world.addChild(this.player, 3);

    me.game.world.addChild(new game.Ground(), 2);

    this.bindEvents();
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
    me.input.unbindKey(me.input.KEY.LEFT);
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindKey(me.input.KEY.UP);
  },

  spawnEnemy: function () {
    me.game.world.addChild(me.pool.pull("enemy", Number.prototype.random(20, 850), 150), 3);
  }
});
