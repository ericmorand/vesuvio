const path = require('path');

let dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

delete require.cache[dataFilePath];

let data = require(dataFilePath);

data.tabs = "grid";

data.languages.forEach(function(language) {

});
data.tabs = [
  {
    title: 'lorem/ipsum',
    status: 'success',
    content: '<img src="http://placehold.it/1080x1920/FF3456?text=lorem/ipsum">'
  },
  {
    title: 'lorem/ipsum'
  },
  {
    title: 'lorem/ipsum'
  },
  {
    title: 'lorem/ipsum'
  },
  {
    title: 'lorem/ipsum'
  },
  {
    title: 'lorem/ipsum'
  }
];

module.exports = {
  deps: [dataFilePath],
  data: data
};
