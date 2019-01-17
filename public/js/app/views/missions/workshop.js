define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    Ladda = require('ladda'),
    IframeTransport = require('jquery.iframe-transport'),
    Mission = require('app/models/mission'),
    tpl = require('text!tpl/missions/workshop.html')

  return Marionette.ItemView.extend({
    template: _.template(tpl),

    events: {
      'click form button': 'submit',
    },

    initialize: function (options) {
      this.missions = options.missions;
    },

    submit: function () {
      const self = this
      const $form = this.$el.find('form')

      const $downloadBtn = $form.find('button[type=submit]')
      const laddaBtn = Ladda.create($downloadBtn.get(0))
      laddaBtn.start();

      $.ajax({
        url: '/api/missions/workshop',
        type: 'POST',
        data: {
          id: $form.find("input.workshop").val(),
        },
        dataType: 'json',
        success: function (data) {
          laddaBtn.stop();
          self.render();
        },
        error: function () {
          laddaBtn.stop();
        },
      });
    },
  });
});
