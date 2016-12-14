require('../toolbar/toolbar');
require('../toolbar/toolbar-group');

const Vue = require('vue');
const path = require('path');

module.exports = Vue.component('component-viewer', {
  template: require('./templates/index.html'),
  props: {
    component: null,
    devices: {
      type: Array,
      default: []
    },
    device: null,
    directions: {
      type: Array,
      default: []
    },
    direction: null
  },
  data: function () {
    return {
      currentDevice: null,
      currentDirection: null
    }
  },
  computed: {
    title: function() {
      return this.currentDevice.title + ' (' + this.currentDevice.width + ')';
    }
  },
  created: function() {
    if (this.currentDevice == null) {
      if (this.device) {
        this.currentDevice = this.device;
      }
      else {
        this.currentDevice = this.devices[0];
      }
    }

    if (this.currentDirection == null) {
      if (this.direction) {
        this.currentDirection = this.direction;
      }
      else {
        this.currentDirection = this.directions[0];
      }
    }
  },
  methods: {
    onIframeLoad: function(e) {
      this.refreshIFrame();
    },
    refreshIFrame: function() {
      var iframe = this.getIframe();
      var html = iframe.contentWindow.document.documentElement;

      html.setAttribute('dir', this.currentDirection.name);
    },
    getIframe: function() {
      var preview = this.$el.getElementsByClassName('preview')[0];
      var iframe = preview.getElementsByTagName('iframe')[0];

      return iframe;
    },
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
    currentDevice: function(val) {
      this.$parent.$emit('component-viewer:device-did-change', this.currentDevice);
    },
    currentDirection: function(val) {
      this.$parent.$emit('component-viewer:direction-did-change', this.currentDirection);

      this.refreshIFrame();
    }
  }
});