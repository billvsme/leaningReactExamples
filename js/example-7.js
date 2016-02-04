var MyComponent = React.createClass({
    handleClick: function() {
        if (this.myTextInput !== null) {
            this.myTextInput.focus();
        }
    },
    render: function() {
        return (
            <div>
                <input type="text" ref={(ref) => this.myTextInput = ref} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <MyComponent />,
    document.getElementById('example')
)
