const Applet = imports.ui.applet;
const Mainloop = imports.mainloop;
// const Soup = imports.gi.Soup;
// const Settings = imports.ui.settings;
const Util = imports.misc.util;

let muted = false;

function MicDisplay(metadata, orientation, panel_heigt, instance_id) {
  this._init(metadata, orientation, panel_heigt, instance_id);
}

MicDisplay.prototype = {
  __proto__: Applet.TextIconApplet.prototype,

  _init: function (metadata, orientation, panel_height, instance_id) {
    Applet.TextIconApplet.prototype._init.call(
      this,
      orientation,
      panel_height,
      instance_id,
    );

    this.set_applet_label("Mic");
    this.updateMuted();

    this.startUp(true);
  },

  updateMuted: function () {
    if (muted) {
      this.set_applet_icon_name("micDisplay-muted");
      this.set_applet_tooltip(_("Microphone is muted"));
    } else {
      this.set_applet_icon_name("micDisplay-recording");
      this.set_applet_tooltip(_("Microphone is recording"));
    }
  },

  on_applet_clicked: function () {
    // switch muted state
    Util.spawnCommandLine("/home/wilhelm/bin/tc30_mute_toggle.sh");
  },

  startUp: function (setupLoop) {
    if (setupLoop) {
      this.updateLoop(true);
    } else {
      this.updateUI();
    }
  },

  updateUI: function () {
    Util.spawn_async(["/home/wilhelm/bin/is_mic_muted.sh"], (stdout) => {
      if (stdout.indexOf("yes") > -1) {
        muted = true;
      } else {
        muted = false;
      }
    });
  },

  updateLoop: function () {
    this.updateUI();
    Mainloop.timeout_add(150, this.updateLoop.bind(this));
    this.updateMuted();
  },
};

function main(metadata, orientation, panel_height, instance_id) {
  return new MicDisplay(metadata, orientation, panel_height, instance_id);
}
