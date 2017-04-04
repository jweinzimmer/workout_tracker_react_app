(function foo() {
    alert("What");
    var CommentBox = React.createClass({
        render: function() {
            return (
              <div className="commentBox">
                Hello, world! I am a CommentssssssssBox.
              </div>
          );
        }
    });
    ReactDOM.render(
      <CommentBox />,
      document.getElementById('content')
    );

}());