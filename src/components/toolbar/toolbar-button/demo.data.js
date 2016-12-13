var path = require('path');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.buttons = [
  {
    name: 'lorem',
    label: 'Lorem ipsum',
    title: 'Dolor sit amet',
    icon: 'desktop',
    active: false
  },
  {
    name: 'ipsum',
    label: 'Lorem ipsum',
    title: 'Dolor sit amet',
    icon: 'desktop',
    active: true
  },
  {
    name: 'dolor',
    title: 'Dolor sit amet',
    icon: 'desktop',
    active: false
  },
  {
    name: 'sit',
    title: 'Dolor sit amet',
    icon: 'desktop',
    active: true
  },
  {
    name: 'amet',
    title: 'Dolor sit amet',
    label: 'Lorem ipsum',
    active: false
  },
  {
    name: 'consectetur',
    title: 'Dolor sit amet',
    label: 'Lorem ipsum',
    active: true
  }
];

module.exports = {
  deps: deps,
  data: data
};
