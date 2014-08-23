game.PlayScreen = me.ScreenObject.extend({
  /**
   *  action to perform on state change
   */
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
  },


  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function() {
    
  }
});
