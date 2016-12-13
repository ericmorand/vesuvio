var fs = require('fs');

module.exports = {
  componentManifest: 'component.json',
  plugins: {
    javascript: {
      module: require('stromboli-plugin-javascript'),
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
      module: require('stromboli-plugin-twig')
    },
    sass: {
      module: require('stromboli-plugin-sass'),
      config: {
        precision: 8,
        functions: {
          'codepoints-to-map($codepoints)': function(codepoints) {
            console.log(codepoints.value);

          }
        }
      }
    }
  }
};