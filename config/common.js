var fs = require('fs');

module.exports = {
  componentManifest: 'component.json',
  plugins: {
    javascript: {
      module: require('stromboli-plugin-javascript'),
      entry: 'index.js',
      config: {
        transform: [
          ['stringify', {
            appliesTo: {
              includeExtensions: ['html']
            }
          }],
          ['aliasify', {
            aliases: {
              'path': 'path/path',
              'vue': 'vue/dist/vue'
            }
          }]
        ]
      }
    },
    twig: {
      module: require('stromboli-plugin-twig'),
      entry: 'index.twig'
    },
    sass: {
      module: require('stromboli-plugin-sass'),
      entry: 'index.scss',
      config: {
        precision: 8
      }
    }
  }
};