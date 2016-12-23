var Vue = require('vue');
var Promise = require('promise');
var CodeMirror = require('codemirror');

module.exports = Vue.component('pretty-print', {
  template: require('./templates/index.html'),
  props: {
    content: {
      type: String,
      default: null
    },
    lang: {
      type: String,
      default: 'html'
    }
  },
  computed: {
    mode: function () {
      switch (this.lang) {
        case 'css':
          return 'css';
        case 'sass':
          return 'sass';
        case 'javascript':
          return 'javascript';
        case 'twig':
          return 'twig';
        default:
          return 'htmlmixed';
      }
    }
  },
  mounted: function () {
    var mode = this.mode;
    var el = this.$el;

    require('../../../node_modules/codemirror/mode/css/css');
    require('../../../node_modules/codemirror/mode/htmlmixed/htmlmixed');
    require('../../../node_modules/codemirror/mode/javascript/javascript');
    require('../../../node_modules/codemirror/mode/sass/sass');
    require('../../../node_modules/codemirror/mode/twig/twig');

    return new Promise(function (fulfill, reject) {
      var list = el.querySelectorAll('.pretty-print textarea');

      for (var i = 0; i < list.length; i++) {
        CodeMirror.fromTextArea(list[i], {
          lineNumbers: true,
          readOnly: true,
          mode: mode
        });
      }

      fulfill();
    });
  }
});