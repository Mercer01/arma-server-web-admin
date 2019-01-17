define(function (require) {
  'use strict'

  const $ = require('jquery')

  const _ = require('underscore')

  const Backbone = require('backbone')

  const Parameter = require('app/models/parameter')

  return Backbone.Collection.extend({
    model: Parameter
  })
})
