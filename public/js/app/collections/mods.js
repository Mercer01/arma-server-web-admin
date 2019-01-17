define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Mod = require('app/models/mod')

  return Backbone.Collection.extend({
    comparator: 'name',
    model: Mod,
    url: '/api/mods/'
  })
})
