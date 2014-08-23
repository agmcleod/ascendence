game.PlayScreen = me.ScreenObject.extend({
  bindEvents: function () {
    me.input.bindKey(me.input.KEY.A, "left");
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.D, "right");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
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
    me.game.world.addChild(new game.Enemy(0, 150), 3);
    
    this.player = new game.Player(200, game.GROUND_Y - 80);
    me.game.world.addChild(this.player, 3);

    me.game.world.addChild(new game.Ground(), 1);

    this.bindEvents();
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.A);
    me.input.unbindKey(me.input.KEY.D);
  }
});
