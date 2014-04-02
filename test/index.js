var vm = require('vm')
var co = require('co')
var assert = require('assert')
var resolve = require('component-resolver')
var Builder = require('component-builder');
var join = require('path').join

var es6modules = require('..');

var options = {
  install: true
}

function fixture(name) {
  return join(__dirname, 'fixtures', name)
}

function build(nodes, options) {
  return new Builder.scripts(nodes, options)
    .use('scripts',
      es6modules(),
      Builder.plugins.js())
}

describe('module-from', function () {
  var tree
  var js = Builder.scripts.require;

  it('should install', co(function* () {
    tree = yield* resolve(fixture('module-from'), options)
  }))

  it('should build', co(function* () {
    js += yield build(tree).end()
  }))

  it('should execute', function () {
    var ctx = vm.createContext()
    vm.runInContext(js, ctx)
  })
})
