'use strict';

var reaction = require('../../index'),
    ReactDOM = reaction.ReactDOM,
    React = reaction.React;

class VanillaApp {
  constructor() {
    var rootDOMElement = document.getElementById('root');

    var Comment = React.createClass({
      render: function() {
        return (

          <div className="comment">
            <p>
              {this.props.message}
            </p>
          </div>
        );
      },
      componentDidMount: function() {
        var message = this.props.message;

        console.log('comment mounted with message ' + message)
      }
    });

    var CommentsList = React.createClass({
      getInitialState: function() {
        var messages = [
              "Hello, world!",
              "Hello world again..."
            ],
            initialState = {
              messages: messages
            };

        return initialState;
      },
      render: function() {
        var comments = this.state.messages.map(function(message) {
          return <Comment message={message} />;
        });

        return (

          <div className="commentsList">
            {comments}
          </div>
        );
      },
      componentDidMount: function() {
        console.log('comments list mounted')
      }
    });

    var commentsList = <CommentsList />;

    ReactDOM.render(commentsList, rootDOMElement);

    var messages = [
          "Hello world yet again!!!"
        ],
        state = {
          messages: messages
        };

    setTimeout(function() {
      commentsList.setState(state);
    }, 1000); ///
  }
}

module.exports = VanillaApp;