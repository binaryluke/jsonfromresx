/*
 * Reference sheet for Nodeunit
 *

 Nodeunit uses the functions available in the node.js assert module:

  ok(value, [message]) - Tests if value is a true value.
  equal(actual, expected, [message]) - Tests shallow, coercive equality with the equal comparison operator ( == ).
  notEqual(actual, expected, [message]) - Tests shallow, coercive non-equality with the not equal comparison operator ( != ).
  deepEqual(actual, expected, [message]) - Tests for deep equality.
  notDeepEqual(actual, expected, [message]) - Tests for any deep inequality.
  strictEqual(actual, expected, [message]) - Tests strict equality, as determined by the strict equality operator ( === )
  notStrictEqual(actual, expected, [message]) - Tests strict non-equality, as determined by the strict not equal operator ( !== )
  throws(block, [error], [message]) - Expects block to throw an error.
  doesNotThrow(block, [error], [message]) - Expects block not to throw an error.
  ifError(value) - Tests if value is not a false value, throws if it is a true value. Useful when testing the first argument, error in callbacks.
  
 Nodeunit also provides the following functions within tests:

  expect(amount) - Specify how many assertions are expected to run within a test. Very useful for ensuring that all your callbacks and assertions are run.
  done() - Finish the current test function, and move on to the next. ALL tests should call this!

 *
 */

var jsonfromresx = require('../src/jsonfromresx');

var BASE_RESOURCE_FILENAME = 'fixtures/resources.resx';
var CULTURE_RESOURCE_FILENAME = 'fixtures/resources.zh-tw.resx';

exports.testConvertMethodExists = function (test) {
  test.notEqual(jsonfromresx.convert, undefined, 'jsonfromresx should expose a "convert" method');
  test.done();
};

exports.testConvertMethodRequiresFilename = function (test) {
  test.throws(jsonfromresx.convert, 'Filename parameter not supplied', 'Filename must be supplied');
  test.doesNotThrow(function () { 
    jsonfromresx.convert(BASE_RESOURCE_FILENAME);
  }, 'Filename parameter not supplied', 'Filename must be supplied');
  test.done();
};

exports.testConvertMethodsReturnsObj = function (test) {
  jsonfromresx.convert(BASE_RESOURCE_FILENAME, null, null, function (result) {
    test.notEqual(result, undefined, 'Convert should return an object');
    test.done();
  });
};

exports.testConvertMethodReturnsCorrectKeyValuePairs = function (test) {
  jsonfromresx.convert(BASE_RESOURCE_FILENAME, null, null, function (result) {
    test.equal(result.WithoutComment, 'Value for Without Comment', 'Convert should return key/value pairs as they appear in resource file.');
    test.equal(result.WithComment, 'Value for With Comment', 'Covert should return key/value pairs as they appear in resource file.');
    test.done();
  });
};

exports.testConvertMethodCorrectlyDecodesHtmlEntitites = function (test) {
  jsonfromresx.convert(BASE_RESOURCE_FILENAME, null, null, function (result) {
    test.equal(result.WithEncoding, '<strong>bold</strong>Not bold', 'Covert method should decode html entities back into html.');
    test.done();
  });
};

exports.testConvertMethodCorrectlyMergesBaseAndCultureResources = function (test) {
  jsonfromresx.convert(BASE_RESOURCE_FILENAME, CULTURE_RESOURCE_FILENAME, null, function (result) {
    test.equal(result.WithComment, '有註解', 'Resource should use culture version if key exists in culture file');
    test.equal(result.WithoutComment, 'Value for Without Comment', 'Resource should use base version if key does not exist in culture file');
    test.done();
  });
};

