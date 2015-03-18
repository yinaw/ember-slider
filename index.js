'use strict';

module.exports = {
  name: 'ember-slider',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/jquery-ui/ui/minified/jquery-ui.custom.min.js');
  }
};
