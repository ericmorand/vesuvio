var path = require('path');
var fs = require('fs');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push(dataFilePath);

var Code = function(title, lang, dataFilePath) {
  var absPath = path.resolve(path.join(__dirname, dataFilePath));

  deps.push(absPath);

  this.title = title;
  this.lang = lang;
  this.content = fs.readFileSync(absPath).toString();
};

data.codes = [
  new Code('HTML', 'html', './data/data.html'),
  new Code('JavaScript', 'javascript', './data/data.js'),
  new Code('SASS', 'sass', './data/data.scss')
];

module.exports = {
  deps: deps,
  data: data
};
