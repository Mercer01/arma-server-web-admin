define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone')

  return Backbone.Model.extend({
    defaults: {
      name: ''
    },
    idAttribute: 'name',
    urlRoot: '/api/missions/',
  });

});
