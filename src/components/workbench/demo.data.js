var path = require('path');
var fs = require('fs');
var deps = [];

var requireDataFile = function(file) {
  var filePath = path.resolve(path.join(__dirname, file));

  delete require.cache[filePath];

  deps.push(filePath);

  var data = require(filePath);

  if (data.deps) {
    deps = deps.concat(data.deps);
    data = data.data;
  }

  return data;
};

var dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.content = "workbench";

// components data
var componentsDataFilePath = path.resolve(path.join(__dirname, '../demo/data/components.js'));

delete require.cache[componentsDataFilePath];

var components = require(componentsDataFilePath);

deps.push(componentsDataFilePath);

data.components = components.data;

// devices
data.devices = requireDataFile('../demo/data/devices.js');

module.exports = {
  deps: deps,
  data: data
};
