var fs = require('fs');
var parseString = require('xml2js').parseString;

// lodash has a good function for this, but prefer no dependencies
var forEachInArray = function (arr, callback) {
  var idx, length;
  if (!arr || !callback) return;
  length = arr.length;
  for (idx=0; idx<length; idx++) {
    callback(arr[idx], idx);
  }
};

// lodash has a good function for this, but prefer no dependencies
var extend = function (obj, props) {
  for (var prop in props) {
    obj[prop] = props[prop];
  }
  return obj;
};

var getResourcesFromResxFilename = function (filename, callback) {
  fs.readFile(filename, {
    encoding: 'utf-8'
  }, function (error, resxAsXml) {
    // silently fail for now
    if (error) return;

    getJsObjFromResxXml(resxAsXml, function (resxAsJs) {
      var resources = getResourcesFromResxJsObj(resxAsJs);

      if (callback) {
        callback(resources);
      }
    });
  });
};

var getJsObjFromResxXml = function (xml, callback) {
  parseString(xml, function (error, resxAsJs) {
    // silently fail for now
    if (error) return;
    
    if (callback) {
      callback(resxAsJs);
    }
  });
};

// resx should be a javascript object that's been converted from the 
//   original resource xml
var getResourcesFromResxJsObj = function (resx) {
  var resources = resx.root.data;
  var response = {};

  forEachInArray(resources, function (resource) {
    var name = resource.$.name;
    var value = resource.value[0];
    response[name] = value;
  });

  return response;
};

var convert = function (baseFilename, cultureFilename, options, callback) {
  if (!baseFilename) {
    throw new Error('Filename parameter not supplied');
  }

  getResourcesFromResxFilename(baseFilename, function (baseResources) {
    if (!cultureFilename && callback) {
      callback(baseResources);
    }

    if (cultureFilename) {
      getResourcesFromResxFilename(cultureFilename, function (cultureResources) {
        var resources = extend(baseResources, cultureResources);
        if (callback) {
          callback(resources);
        }
      });
    }
  });
};

module.exports = {
  convert : convert
};
