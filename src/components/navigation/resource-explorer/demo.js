require('.');
require('../../demo');

const Vue = require('vue');

Vue.component('demo-navigation-resource-explorer', {
  methods: {
    onAddBinaryButtonClick: function (e) {
      this.$refs.resourceExplorer.onPluginDidRenderComponent('sass', {
        name: 'lorem/ipsum',
        utl: '/breakpoint',
        renderResult: {
          binaries: [
            {
              file: 'index.css',
              data: '.dummy {background-color: red;}'
            }
          ],
          dependencies: [
            {
              file: 'index.scss',
              data: '.dummy {background-color: red;}'
            }
          ]
        }
      });
    }
  }
});

new Vue({
  el: '#app'
});
