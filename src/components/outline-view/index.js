var Vue = require('vue');
var TreeModel = require('tree-model');

module.exports = Vue.component('outline-view', {
  template: require('./templates/index.html'),
  props: {
    root: null,
    delegate: null,
    level: {
      type: Number,
      default: 0
    },
    allowsMultipleSelection: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      tree: null,
      expandedNodes: [],
      selectedNodes: [],
      expandedItems: []
    }
  },
  computed: {},
  created: function () {
    this.$on('outline-view-item:item-click', function (item) {
      this.$parent.$emit('outline-view:item-click', item);
    });

    this.$on('outline-view-item:expander-click', function (item) {
      this.$parent.$emit('outline-view:expander-click', item);
    });

    var tree = new TreeModel();

    this.tree = tree.parse(this.root);

    var that = this;

    this.walk = function (item, depth) {
      item.depth = depth;
      item.expanded = false;

      if (item.children.length > 0) {
        item.children.forEach(function (child) {
          that.walk(child, depth + 1);
        });
      }
    };

    this.walk(this.root, 0);
  },
  methods: {
    onExpanderClick: function (node) {
      // this.$parent.$emit('outline-view-item:expander-click', this.item);

      if (this.isNodeExpanded(node)) {
        this.collapseNode(node, true, true);
      }
      else {
        this.expandNode(node, false);
      }
    },
    onItemClick: function (node) {
      // this.$parent.$emit('outline-view-item:item-click', this.item);

      if (this.isNodeSelected(node)) {
        this.deselectNode(node);
      }
      else {
        this.selectNode(node);
      }
    },
    isNodeLeaf: function (node) {
      return (node.children.length < 1);
    },
    isNodeExpanded: function (node) {
      // root node is always expanded
      if (node.isRoot()) {
        return true;
      }

      return this.expandedNodes.indexOf(node) > -1;
    },
    isItemExpanded: function (item) {
      // root node is always expanded
      // if (node.isRoot()) {
      //   return true;
      // }

      return this.expandedItems.indexOf(item) > -1;
    },
    isNodeSelected: function (node) {
      return this.selectedNodes.indexOf(node) > -1;
    },
    isNodeVisible: function (node) {
      var that = this;

      // root node is never visible
      if (node.isRoot()) {
        return false;
      }

      var walk = function (node) {
        if (node.parent) {
          if (that.isNodeExpanded(node.parent)) {
            return walk(node.parent);
          }
          else {
            return false;
          }
        }
        else {
          return that.isNodeExpanded(node);
        }
      };

      return walk(node);
    },
    collapseNode: function (node, collapseChildren, deselectChildren) {
      var that = this;
      var index = this.expandedNodes.indexOf(node);

      if (index > -1) {
        this.expandedNodes.splice(index, 1);

        node.children.forEach(function (childNode) {
          if (collapseChildren) {
            // collapse children nodes
            that.collapseNode(childNode, true, deselectChildren);
          }

          if (deselectChildren) {
            that.deselectNode(childNode, true);
          }
        });
      }
    },
    expandNode: function (node, expandChildren) {
      var that = this;
      this.expandedNodes.push(node);

      node.children.forEach(function (childNode) {
        if (expandChildren) {
          that.expandNode(childNode, true);
        }
      });
    },
    selectNode: function (node) {
      var shouldSelect = true;

      if (this.delegate) {
        shouldSelect = this.delegate.outlineViewShouldSelectNode(node);
      }

      if (shouldSelect && (this.selectedNodes.indexOf(node) < 0)) {
        if (!this.allowsMultipleSelection) {
          this.selectedNodes.splice(0, this.selectedNodes.length);
        }

        this.selectedNodes.push(node);
      }
    },
    deselectNode: function (node, deselectChildren) {
      var that = this;
      var index = this.selectedNodes.indexOf(node);

      if (index > -1) {
        this.selectedNodes.splice(index, 1);

        node.children.forEach(function (childNode) {
          if (deselectChildren) {
            that.deselectNode(childNode, true);
          }
        });
      }
    },
    reloadItem: function(item) {
      var tree = new TreeModel();

      this.tree = tree.parse(item);

      var that = this;

      this.walk = function (item, depth) {
        item.depth = depth;
        item.expanded = false;

        if (item.children.length > 0) {
          item.children.forEach(function (child) {
            that.walk(child, depth + 1);
          });
        }
      };

      this.walk(this.root, 0);
    },
    getNodeClasses: function (node) {
      var classes = [];

      if (this.isNodeLeaf(node)) {
        classes.push('leaf');
      }

      if (this.isNodeExpanded(node)) {
        classes.push('expanded');
      }

      if (this.isNodeSelected(node)) {
        classes.push('selected');
      }

      if (this.delegate) {
        classes = classes.concat(this.delegate.outlineViewGetNodeClasses(node));
      }

      return classes;
    },
    getNodeForItem: function(item) {
      return this.tree.first(function(node) {
        return (node.model == item);
      });
    }
  },
  watch: {
    root: function (val) {
      this.reloadItem(val);
    },
    selectedNodes: function(val) {
      this.$parent.$emit('outline-view:selection-did-change', this);
    }
  }
});