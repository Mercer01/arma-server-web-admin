define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Log = require('app/models/log')

  return Backbone.Collection.extend({
    comparator: 'name',
    model: Log,
    url: '/api/logs/'
  });

});
