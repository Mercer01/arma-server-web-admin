define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    Ladda = require('ladda'),
    IframeTransport = require('jquery.iframe-transport'),
    Mission = require('app/models/mission'),
    tpl = require('text!tpl/missions/upload.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl),

    events: {
      'click form button': 'submit',
    },

    submit: function () {
      const self = this
      const $form = this.$el.find('form')

      const $uploadBtn = $form.find('button[type=submit]')
      const laddaBtn = Ladda.create($uploadBtn.get(0))
      laddaBtn.start();

      $.ajax("/api/missions", {
        success: function(data) {
          laddaBtn.stop();
          self.render();
        },
        error: function () {
          laddaBtn.stop();
        },
        files: $form.find(":file"),
        iframe: true
      });
    },
  });
});
