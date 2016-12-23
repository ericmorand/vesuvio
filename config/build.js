const merge = require('merge');
const path = require('path');

let tmpPath = 'tmp';
let distPath = 'dist';

module.exports = {
  plugins: {
    js: {
      config: merge.recursive(require('./plugin/javascript'), {
        plugin: [
          function (bundle, opts) {
            return require('minifyify')(bundle, {map: false});
          }
        ]
      })
    },
    css: {
      config: merge.recursive(require('./plugin/sass'), {
        sourceMap: false,
        sourceComments: false
      })
    }
  },
  distPath: distPath,
  postcss: {
    plugins: [
      require('cssnano')({
        discardDuplicates: true
      }),
      require('postcss-copy')({
        src: '.',
        dest: distPath,
        template: function (fileMeta) {
          return 'assets/' + fileMeta.hash + '.' + fileMeta.ext;
        },
        relativePath: function (dirname, fileMeta, result, options) {
          return path.relative(fileMeta.src, distPath);
        },
        hashFunction: function (contents) {
          // sha256
          const createSha = require('sha.js');

          return createSha('sha256').update(contents).digest('hex');
        }
      })
    ]
  },
  paths: {
    tmp: tmpPath,
    dist: distPath
  }
};