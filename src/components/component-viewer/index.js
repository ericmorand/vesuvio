require('../toolbar/toolbar');
require('../toolbar/toolbar-group');

const Vue = require('vue');
const path = require('path');

var defaultDevice = {
  title: 'Full width',
  name: 'fullscreen',
  width: '100%'
};

module.exports = Vue.component('component-viewer', {
  template: require('./templates/index.html'),
  props: {
    component: null,
    devices: {
      type: Array,
      default: []
    }
  },
  data: function () {
    return {
      currentDevice: defaultDevice,
      currentDirection: 'ltr'
    }
  },
  computed: {
    title: function() {
      return this.currentDevice.title + ' (' + this.currentDevice.width + ')';
    }
  },
  created: function() {
    if (this.devices.indexOf(defaultDevice) < 0) {
      this.devices.unshift(defaultDevice);
    }
  },
  methods: {
    onOpenInOwnWindowButtonClick: function (e) {
      window.open(this.component.url);
    },
    onDeviceButtonClick: function(device) {
      this.currentDevice = device;
    },
    onDirectionButtonClick: function(direction) {
      this.currentDirection = direction;
    }
  },
  watch: {
    currentDirection: function(val) {
      var preview = this.$el.getElementsByClassName('preview')[0];
      var iframe = preview.getElementsByTagName('iframe')[0];

      var html = iframe.contentWindow.document.documentElement;

      html.setAttribute('dir', this.currentDirection);
    }
  }
});