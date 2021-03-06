
/* Game namespace */
var game = {
  // Run on page load.
  "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen",  me.video.CANVAS, 960, 640, true, 'auto')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(this, debugPanel, "debug");
        me.debug.renderHitBox = true;
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },

  // Run on game resources loaded.
  "loaded" : function () {
    this.atlas = new me.TextureAtlas(
      me.loader.getJSON("atlas"),
      me.loader.getImage("atlas")
    );

    me.pool.register('bullet', game.Bullet, true);
    me.pool.register('enemy', game.Enemy, true);

    this.playScreen = new game.PlayScreen();
    this.middle = me.game.viewport.width / 2;
    this.GROUND_Y = 497;

    // Start the game.
    me.state.set(me.state.PLAY, this.playScreen);
    me.state.change(me.state.PLAY);
  }
};
