define(function (require) {
  
  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone')

  return Backbone.Model.extend({
    defaults: {
      name: '',
      formattedSize: '0 B',
      size: 0,
    },
    idAttribute: 'name',
  });
  
});
