'use strict';

module.exports = {
  name: 'ember-slider',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jquery-ui/jquery-ui.js');
    app.import('bower_components/jquery-ui/ui/slider.js');
    app.import('bower_components/jquery-ui/themes/base/slider.css');
    app.import('bower_components/jquery-ui/themes/base/theme.css');
  }

};
