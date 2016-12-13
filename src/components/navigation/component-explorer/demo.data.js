var path = require('path');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

// components data
var componentsDataFilePath = path.resolve(path.join(__dirname, '../../demo/data/components.js'));

delete require.cache[componentsDataFilePath];

var components = require(componentsDataFilePath);

deps.push(componentsDataFilePath);

data.components = components.data;

module.exports = {
  deps: deps,
  data: data
};
