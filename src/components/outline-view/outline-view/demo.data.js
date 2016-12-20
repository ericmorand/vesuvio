var path = require('path');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.root = {
  name: 'Lorem ipsum',
  children: [
    {
      name: 'Dolor sit amet',
      icon: 'folder',
      children: [
        {
          name: 'Ferri',
          icon: 'folder',
          children: []
        },
        {
          name: 'Ferri',
          icon: 'folder',
          children: []
        },
        {
          name: 'Ferri',
          icon: 'folder',
          children: [
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: []
            },
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: []
            },
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: [
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                },
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                },
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'Dolor sit amet',
      icon: 'folder',
      children: [
        {
          name: 'Ferri conclusionemque eum et',
          icon: 'folder',
          children: []
        },
        {
          name: 'Ferri conclusionemque eum et',
          icon: 'folder',
          children: []
        },
        {
          name: 'Ferri conclusionemque eum et',
          icon: 'folder',
          children: [
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: []
            },
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: []
            },
            {
              name: 'Ferri conclusionemque eum et',
              icon: 'folder',
              children: [
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                },
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                },
                {
                  name: 'Ferri conclusionemque eum et',
                  icon: 'folder',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

module.exports = {
  deps: deps,
  data: data
};
