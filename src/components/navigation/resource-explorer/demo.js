require('.');
require('../../demo');

const Vue = require('vue');

Vue.component('demo-navigation-resource-explorer', {
  methods: {
    onAddBinaryButtonClick: function (e) {
      this.$refs.resourceExplorer.addRenderResult({
        component: {
          name: 'lorem/ipsum'
        },
        type: 'binary',
        plugin: 'js',
        data: 'dummy binary'
      });
    }
  }
});

new Vue({
  el: '#app'
});
