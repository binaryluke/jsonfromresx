# JSON From Resx

JSON From Resx is a node module that converts resource files (.resx) into JavaScript objects.

From there, it's easy to save out as a JSON file for use on front-end projects.

## Why does it exist?

When I converted an asp.net MVC website into a cordova application for Android/iOS, server side rendering of HTML was no longer possible.

The easiest thing to do was convert the resource files into JSON and bundle them with the app.

There weren't any up-to-date modules for this purpose at the time, so I created this module to meet that need.

## Installation

This module is only designed to work as a node module.

The easiest way to install it is with:

```shell
npm install grunt-contrib-jshint --save-dev
```

## Usage

First, require the module in your node project:

```js
var jsonfromresx = require('jsonfromresx');
```

Then you can call `convert` to generate JavaScript objects from resource files.

```
convert(baseFilename, cultureFilename, options, callback)
```

#### baseFilename
Type: `string`  
Required: `true`

#### cultureFilename
Type: `string`
Required: `false`

If the cultureFilename parameter is defined, it merges the file with the baseFilename the same way that asp.net does. So if a key exists in both the base and culture resource file, the culture resource file version takes precedence.

#### options
Type: `Object`
Required: `false`

Currently, there are no special `options` to be specified, and `null` or `{}` can be passed.

#### callback
Type: `Function`
Required: `true`

`convert` is async, so once it's finished it will call the callback function with the resources object as the first parameter.

## Example usage

```js
jsonfromresx.convert(
  'fixtures/resources.resx',
  'fixtures/resources.zh-tw.resx',
  {},
  function (result) {
    console.log(result);
  }
);
```

## Tests

Tests can be run with either `npm test`, `nodeunit tests/` or `grunt nodeunit`.

Any contributions must ensure that all tests are passing and that you've added new tests for the new features.

During development, you can run `grunt watch` to have jshint and nodeunit run everytime you update the source code.

## Reporting a bug

To report a bug simply create a
[new GitHub Issue](https://github.com/binaryluke/jsonfromresx/issues/new) and describe your problem or suggestion. All kinds of feedback are welcome, including but not limited to:

 * When jsonfromresx doesn't work as expected
 * When you simply want a new option or feature

## License

jsonfromresx is released under the MIT license.

## Development

jsonfromresx is currently maintained by [Luke Howard](https://github.com/binaryluke/).

## Thank you!

I hope jsonfromresx serves its purpose for you, and I really appreciate all kinds of feedback and contributions!