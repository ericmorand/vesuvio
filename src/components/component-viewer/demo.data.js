var path = require('path');
var fs = require('fs');
var deps = [];

var readDataFile = function(file) {
  var filePath = path.resolve(path.join(__dirname, file));

  delete require.cache[dataFilePath];

  deps.push(dataFilePath);

  return fs.readFileSync(filePath).toString()
};

var dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push(dataFilePath);

data.components = [
  {
    title: 'URL',
    url: '/breakpoint'
  }
];

data.devices = [
  {
    title: 'Desktop',
    name: 'desktop',
    width: '1920px'
  },
  {
    title: 'Laptop',
    name: 'laptop',
    width: '1440px'
  },
  {
    title: 'Tablet - Landscape',
    name: 'tablet-landscape',
    width: '1024px'
  },
  {
    title: 'Tablet - Portrait',
    name: 'tablet-portrait',
    width: '768px'
  },
  {
    title: 'Smartphone',
    name: 'smartphone',
    width: '480px'
  }
];

module.exports = {
  deps: deps,
  data: data
};
