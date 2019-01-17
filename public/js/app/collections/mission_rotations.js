define(function (require) {

  "use strict";

  const $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    MissionRotation = require('app/models/mission_rotation')

  return Backbone.Collection.extend({
    model: MissionRotation,
  });

});
