
var crypto = require('crypto');
var detect = require('js-module-formats').detect;
var compile = require('es6-module-transpiler').Compiler;

var cache = Object.create(null);

module.exports = function (options) {
  options = options || {};

  return function es6ModuleToCJS(file, done) {
    if (file.extension !== 'js') return done();
    file.read(function (err, string) {
      if (err) return done(err);

      var format = detect(string);
      if (format !== 'es') return done();

      var hash = calculate(string);

      try {
        file.string =
        cache[hash] = cache[hash]
          || new compile(string).toCJS();
      } catch (err) {
        done(err);
        return
      }

      done();
    })
  }
}

function calculate(string) {
  return crypto.createHash('sha256')
    .update(string)
    .digest('hex');
}