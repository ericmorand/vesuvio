var path = require('path');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.groups = [
  {
    buttons: [
      {
        name: 'lorem',
        label: 'Lorem ipsum',
        title: 'Dolor sit amet',
        icon: 'desktop'
      },
      {
        name: 'ipsum',
        title: 'Lorem ipsum',
        icon: 'laptop'
      },
      {
        name: 'dolor',
        title: 'Lorem ipsum',
        icon: 'tablet-portrait'
      }
    ]
  },
  {
    title: 'Devices',
    buttons: [
      {
        name: 'sit',
        title: 'Lorem ipsum',
        icon: 'desktop',
        data: {
          width: '1920px'
        }
      },
      {
        name: 'amet',
        title: 'Lorem ipsum',
        icon: 'laptop',
        data: {
          width: '1440px'
        }
      },
      {
        name: 'consectetur',
        title: 'Lorem ipsum',
        icon: 'tablet-portrait',
        data: {
          width: '768px'
        }
      }
    ]
  }
];

module.exports = {
  deps: deps,
  data: data
};
