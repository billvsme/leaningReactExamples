var data = [
    {author: "Pete Hunt", text: "This is one comment."},
    {author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({
    rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    },

    render: function() {
        return (
            <div className="comment">
            <h2 className="commentAuthor">
                {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment)   {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.author.value.trim();
        var text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.value = '';
        this.refs.text.value = '';
    },
    render: function() {
        return (
            <form action="" className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.setState({data: data})
    },
    handleCommentSubmit: function(comment) {
        data.push(comment);
        this.setState({data: data})
    },
    render: function() {
        return (
            <div className="CommentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox />,
    document.getElementById('example')
);
