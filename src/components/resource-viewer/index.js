const Vue = require('vue');
const path = require('path');

module.exports = Vue.component('resource-viewer', {
  template: require('./templates/index.html'),
  props: {
    resource: null
  },
  data: function () {
    return {}
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
  methods: {
    onOpenInOwnWindowButtonClick: function (e) {
      window.open(this.resource.url);
    },
    deviceButtonClass: function (device) {
      return 'icon-' + device.name;
    }
  },
  watch: {
    resource: function (val) {
      this.refreshPrettyprint();
    }
  }
});