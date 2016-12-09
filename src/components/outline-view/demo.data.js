var path = require('path');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.root = {
  title: 'Lorem ipsum',
  children: [
    {
      title: 'Dolor sit amet',
      children: [
        {
          title: 'Ferri conclusionemque eum et'
        },
        {
          title: 'Ferri conclusionemque eum et'
        },
        {
          title: 'Ferri conclusionemque eum et'
        }
      ]
    }
  ]
};

module.exports = {
  deps: deps,
  data: data
};
