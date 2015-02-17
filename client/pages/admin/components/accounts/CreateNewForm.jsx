var React = require('react/addons');
var ReactRouter = require('react-router');
var Modal = require('../../../../components/Modal.react');
var ControlGroup = require('../../../../components/form/ControlGroup.react');
var TextControl = require('../../../../components/form/TextControl.react');
var Button = require('../../../../components/form/Button.react');
var Spinner = require('../../../../components/form/Spinner.react');
var Actions = require('../../actions/Account');


var LinkedState = React.addons.LinkedStateMixin;
var State = ReactRouter.State;
var Navigation = ReactRouter.Navigation;


var Component = React.createClass({
    mixins: [ LinkedState, State, Navigation ],
    getDefaultProps: function () {

        return {
            data: {
                hasError: {},
                help: {}
            }
        };
    },
    getInitialState: function () {

        return {};
    },
    componentWillUnmount: function () {

        clearTimeout(this.timeout);
    },
    componentWillReceiveProps: function(nextProps) {

        if (!nextProps.data.show) {
            this.replaceState({});
        }
        else {
            this.timeout = setTimeout(function () {

                this.refs.name.refs.inputField.getDOMNode().focus();
            }.bind(this), 100);
        }
    },
    onSubmit: function (event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.createNew({
            name: this.state.name
        }, this);
    },
    render: function () {

        var alerts;
        if (this.props.data.error) {
            alerts = <div className="alert alert-danger">
                {this.props.data.error}
            </div>;
        }

        var notice;
        if (this.props.data.success) {
            notice = <div className="alert alert-success">
                Loading data...
            </div>;
        }

        var formElements;
        if (!this.props.data.success) {
            formElements = <fieldset>
                {alerts}
                <TextControl
                    name="name"
                    ref="name"
                    label="Name"
                    hasError={this.props.data.hasError.name}
                    valueLink={this.linkState('name')}
                    help={this.props.data.help.name}
                    disabled={this.props.data.loading}
                />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{'btn-primary': true}}
                        disabled={this.props.data.loading}>

                        Create new
                        <Spinner space="left" show={this.props.data.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <Modal
                header="Create new"
                show={this.props.data.show}
                onClose={Actions.hideCreateNew}>

                <form onSubmit={this.onSubmit}>
                    {notice}
                    {formElements}
                </form>
            </Modal>
        );
    }
});


module.exports = Component;
