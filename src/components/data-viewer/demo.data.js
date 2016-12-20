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

data.resources = [
  {
    title: 'URL',
    url: '//placehold.it/1024x768'
  },
  {
    title: 'SASS',
    lang: 'sass',
    data: readDataFile('data/resource-data.scss')
  },
  {
    title: 'CSS',
    lang: 'sass',
    data: readDataFile('data/resource-data.css')
  },
  {
    title: 'JavaScript',
    lang: 'js',
    data: readDataFile('data/resource-data.js')
  },
  {
    title: 'Twig',
    lang: 'twig',
    data: readDataFile('data/resource-data.twig')
  },
  {
    title: 'HTML',
    lang: 'html',
    data: readDataFile('data/resource-data.html')
  }
];

data.devices = [
  {
    title: 'Desktop',
    name: 'desktop_windows',
    width: 1920
  },
  {
    title: 'Laptop',
    name: 'laptop_windows',
    width: 1440
  },
  {
    title: 'Tablet',
    name: 'tablet_android',
    width: 1024
  },
  {
    title: 'Smartphone',
    name: 'smartphone',
    width: 480
  }
];

module.exports = {
  deps: deps,
  data: data
};
