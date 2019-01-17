define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const MissionRotation = require('app/models/mission_rotation')

  return Backbone.Collection.extend({
    model: MissionRotation
  })
})
