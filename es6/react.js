'use strict';

const ReactComponent = require('./reactComponent'),
      ReactClass = require('./reactClass'),
      Element = require('./element'),
      TextElement = require('./textElement'),
      DisplayElement = require('./displayElement'),
      ReactClassElement = require('./reactClassElement'),
      ReactFunctionElement = require('./reactFunctionElement'),
      ReactComponentElement = require('./reactComponentElement');

class React {
  static createClass(object) {
    return ReactClass.fromObject(object);
  }

   static createElement(reactObjectOrDisplayName, properties, ...childArguments) {
    if (reactObjectOrDisplayName === undefined) {
      return undefined;
    }

    const children = childrenFromChildArguments(childArguments),
          props = Object.assign({}, properties, {children: children});

    if (reactObjectOrDisplayName.prototype instanceof ReactComponent) {
      var reactComponentConstructor = reactObjectOrDisplayName,
          reactComponent = new reactComponentConstructor();

      return new ReactComponentElement(reactComponent, props);
    } else if (reactObjectOrDisplayName instanceof ReactClass) {
      var reactClass = reactObjectOrDisplayName;

      return new ReactClassElement(reactClass, props);
    } else if (typeof reactObjectOrDisplayName === 'function') {
      var reactFunction = reactObjectOrDisplayName;

      return new ReactFunctionElement(reactFunction, props);
    } else {
      var displayName = reactObjectOrDisplayName;

      return new DisplayElement(displayName, props);
    }
  }
}

module.exports = React;

React.Component = ReactComponent;

function childrenFromChildArguments(childArguments) {
  var firstChildArgument = first(childArguments);

  if (firstChildArgument instanceof Array) {
    childArguments = firstChildArgument;
  }

  return childArguments.map(function(childArgument) {
    if (childArgument instanceof Element) {
      return childArgument;
    } else {
      var text = '' + childArgument;  ///

      return new TextElement(text);
    }
  });
}

function first(array) { return array[0]; }
