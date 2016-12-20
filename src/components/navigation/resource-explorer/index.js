var Vue = require('vue');
var path = require('path');
var TreeModel = require('tree-model');

require('../../toolbar/toolbar');
require('../../outline-view/outline-view');
require('../../search-input');

var OutlineViewItemModel = function (component, name) {
  this.component = component;
  this.name = name;
  this.children = [];
  this.data = null;
  this.type = null; // demo, binary, dependency, plugin
  this.expanded = false;
  this.selected = false;
  this.visible = true;
};

module.exports = Vue.component('resource-explorer', {
  template: require('./templates/index.html'),
  props: {
    components: {
      type: Array,
      default: []
    }
  },
  data: function () {
    return {
      root: null,
      tree: null,
      filter: {
        text: null,
        showBinaries: false,
        showDependencies: false
      },
      searchInputDelegate: {
        value: null,

        valueDidChange: function (value) {
          this.value = value;
        }
      },
      resource: null,
      expandedItems: []
    }
  },
  created: function () {
    this.$on('search-input:value-did-change', function (value) {
      this.filter.text = value;
    });

    this.$on('outline-view:item-click', function (item) {
      if (this.shouldSelectItem(item)) {
        this.resource = item;
      }
    });

    this.$on('outline-view:expander-click', function (item) {
      item.expanded = !item.expanded;

      // collapse item children
      if (!item.expanded) {
        var node = this.tree.first(function (node) {
          return (node.model == item);
        });

        if (node) {
          node.walk(function(childNode) {
            childNode.model.expanded = false;
          });
        }
      }
    });

    this.shouldSelectItem = function (item) {
      return (item.type == 'demo') ||
        (item.type == 'binary' && item.children.length < 1) ||
        (item.type == 'dependency' && item.children.length < 1);
    };

    this.outlineViewDelegate = {
      outlineViewItemClass: function (item) {
        if (item.type == 'demo') {
          return 'component';
        }

        if (item.children.length > 0) {
          if (item.type) {
            return item.type + '-root';
          }

          return 'folder';
        }

        return item.type;
      }
    };
  },
  mounted: function () {
    var that = this;

    this.refresh = function () {
      var tree = new TreeModel();
      var root = {
        children: []
      };

      var filter = this.filter;

      var getItemWithName = function (root, name) {
        return root.children.find(function (child) {
          return (child.name == name);
        });
      };

      var getItemWithId = function (root, id) {
        return root.children.find(function(child) {
          if (child.id == id) {
            return child;
          }
          else {
            if (child.children) {
              return getItemWithId(child, id);
            }
            else {
              return null;
            }
          }
        });
      };

      var processRenderResult = function (component, itemId, renderResult, renderResultKey, type, componentRoot) {
        var elements = renderResult[renderResultKey];

        elements.forEach(function (element) {
          var elementRoot = componentRoot;
          var elementPathComponents = element.path.split(path.sep);

          elementPathComponents.unshift(renderResult.type);
          elementPathComponents.unshift(renderResultKey);

          var _itemId = itemId;

          elementPathComponents.forEach(function (elementPathComponent, index) {
            _itemId += '/' + elementPathComponent;

            var model = getItemWithId(elementRoot, _itemId);

            if (!model) {
              model = new OutlineViewItemModel(component, elementPathComponent);
              model.id = _itemId;

              elementRoot.children.push(model);
            }
            else {
              console.log('FOUND MODEL', _itemId, model.expanded);

            }

            // previsously expanded?
            var expModel = getItemWithId(that.root, model.id);

            if (expModel) {
              console.log('expanded', expModel.expanded);

              model.expanded = expModel.expanded;
            }

            model.data = element.data;

            if (index === 1) {
              model.type = 'plugin';
            }
            else {
              model.type = type;
            }

            elementRoot = model;
          });
        });
      };

      var processComponent = function (component, root) {
        var _root = root;

        var componentNameParts = component.name.split(path.sep);
        var itemId = '';

        componentNameParts.forEach(function (namePart, index) {
          itemId += '/' + namePart;

          var model = getItemWithId(_root, itemId);


          if (!model) {
            model = new OutlineViewItemModel(component, namePart);
            model.data = component.url;
            model.id = itemId;

            _root.children.push(model);
          }
          else {
            console.log('FOUND MODEL', itemId, model.expanded);

          }

          // previsously expanded?
          var expModel = getItemWithId(that.root, model.id);


          if (expModel) {
            console.log('expanded', expModel.expanded);

            model.expanded = expModel.expanded;
          }


          var lastIndex = componentNameParts.length - 1;

          if (index == lastIndex) {
            model.type = 'demo';
          }

          _root = model;
        });

        var componentRoot = _root;

        component.renderResults.forEach(function (renderResult) {
          if (filter.showBinaries) {
            processRenderResult(component, itemId, renderResult, 'binaries', 'binary', componentRoot);
          }

          if (filter.showDependencies) {
            processRenderResult(component, itemId, renderResult, 'dependencies', 'dependency', componentRoot);
          }
        });
      };

      this.components.forEach(function (component) {
        if (component.name.indexOf(filter.text) !== -1) {
          processComponent(component, root);
        }
      });

      this.root = root;
      this.tree = tree.parse(root);

      // select first valid item, if any
      var node = this.tree.first(function (node) {
        return (that.shouldSelectItem(node.model));
      });

      if (node) {
        this.resource = node.model;
      }
      else {
        this.resource = null;
      }
    };

    this.refresh();
  },
  methods: {
    applyFilter: function () {
      this.refresh();
    },
    onBinariesButtonClick: function () {
      this.filter.showBinaries = !this.filter.showBinaries;
    },
    onDependenciesButtonClick: function () {
      this.filter.showDependencies = !this.filter.showDependencies;
    },
    addBinary: function (binary) {

    }
  },
  watch: {
    resource: function (val, oldVal) {
      var resourceNode = this.tree.first(function (node) {
        return (node.model == val);
      });

      // expand path to the resource node
      if (resourceNode) {
        var nodes = resourceNode.getPath();

        nodes.forEach(function (node) {
          if (node != resourceNode) {
            node.model.expanded = true;
          }
        });
      }

      // deselect all other items
      this.tree.walk(function (node) {
        node.model.selected = (node.model == val);
      });

      this.$parent.$emit('resource-explorer:resource-did-change', val);
    },
    'filter.text': function (val) {
      this.applyFilter();
    },
    'filter.showDependencies': function (val) {
      this.applyFilter();
    },
    'filter.showBinaries': function (val) {
      this.applyFilter();
    },
    'searchInputDelegate.value': function (val) {
      this.filter.text = val;
    }
  }
});