const Vue = require('vue');
const path = require('path');

module.exports = Vue.component('data-viewer', {
  template: require('./templates/index.html'),
  props: {
    data: null
  },
  created: function () {
    this.refreshPrettyprint = function () {
      this.$nextTick(function () {
        var prettyprint = require('../prettyprint');

        return prettyprint(this.$el);
      })
    };

    this.refreshPrettyprint();
  },
  watch: {
    data: function (val) {
      this.refreshPrettyprint();
    }
  }
});