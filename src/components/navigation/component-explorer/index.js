const Vue = require('vue');
const path = require('path');

require('../../outline-view');

var outlineViewDelegate = function () {
  this.outlineViewShouldSelectItem = function(outlineView, item) {
    return (
      (item.types.indexOf('component') > -1) ||
      (item.types.indexOf('binary') > -1) ||
      (item.types.indexOf('dependency') > -1)
    );
  };

  this.outlineViewClassForItem = function(outlineViewItem, item) {
    if (item.types.indexOf('binary') > -1) {
      return 'binary';
    }

    if (item.types.indexOf('dependency') > -1) {
      return 'dependency';
    }

    if (item.types.indexOf('binary-root') > -1) {
      return 'binary-root';
    }

    if (item.types.indexOf('dependency-root') > -1) {
      return 'dependency-root';
    }

    if (item.types.indexOf('plugin-root') > -1) {
      return 'plugin-root';
    }

    if (item.types.indexOf('component') > -1) {
      return 'component';
    }

    return 'folder';
  };
};

module.exports = Vue.component('component-explorer', {
  template: require('./templates/index.html'),
  props: {
    title: null,
    components: {
      type: Array,
      default: []
    }
  },
  data: function () {
    return {
      root: null,
      outlineViewDelegate: new outlineViewDelegate()
    }
  },
  created: function () {
    var that = this;

    this.$on('outline-view:selection-did-change', function (item) {
      this.$parent.$emit('component-explorer:selection-did-change', item);

      console.log(item);
    });

    // create structure
    var root = {
      children: []
    };

    var getItemWithName = function (root, name) {
      return root.children.find(function (aChild) {
        return (aChild.title == name);
      });
    };

    this.rc = function(component) {
      var getTt = function(renderResult, renderResultKey, type, root) {
        var elements = renderResult[renderResultKey];

        elements.forEach(function (element) {
          var elementRoot = root;

          var elementPathComponents = element.path.split(path.sep);

          elementPathComponents.unshift(renderResult.type);
          elementPathComponents.unshift(renderResultKey);

          elementPathComponents.forEach(function (elementPathComponent, index) {
            var item = getItemWithName(elementRoot, elementPathComponent);

            if (!item) {
              item = {
                title: elementPathComponent,
                children: [],
                types: [],
                data: element.data
              };

              elementRoot.children.push(item);
            }

            if (index === 0) {
              item.types.push('folder');
              item.types.push(type + '-root');
            }
            else if (index === 1) {
              item.types.push('folder');
              item.types.push('plugin-root');
            }
            else {
              if (index < (elementPathComponents.length - 1)) {
                item.types.push('folder');
              }
              else {
                item.types.push(type);
              }
            }

            elementRoot = item;
          });
        });
      };

      var _root = root;

      var componentPathComponents = component.name.split(path.sep);

      componentPathComponents.forEach(function (componentPathComponent, index) {
        var item = getItemWithName(_root, componentPathComponent);

        if (!item) {
          item = {
            title: componentPathComponent,
            children: [],
            types: [],
            url: component.url
          };

          _root.children.push(item);
        }

        var lastIndex = componentPathComponents.length - 1;

        if (index < lastIndex) {
          item.types.push('folder');
        }
        else if (index == lastIndex) {
          item.types.push('component');
        }

        _root = item;
      });

      var cRoot = _root;

      component.renderResults.forEach(function (rr) {
        getTt(rr, 'binaries', 'binary', cRoot);
        getTt(rr, 'dependencies', 'dependency', cRoot);
      });
    };

    this.components.forEach(function (component) {
      that.rc(component);
    });

    this.root = root;
  },
  methods: {}
});