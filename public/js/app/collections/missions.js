define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Mission = require('app/models/mission')

  return Backbone.Collection.extend({
    comparator: 'name',
    model: Mission,
    url: '/api/missions/'
  })
})
