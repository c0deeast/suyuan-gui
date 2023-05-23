import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import ToolContainerComponent from '../components/tool-container/tool-container.jsx';
import { setSerialValue } from '../reducers/tool-form.js';

class ToolContainer extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, [
            'handleSize',
            'containerRef'
        ]);
        this.state = {
            clientHeight: null
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleSize);
    }

    handleSize() {
        this.setState({
            clientHeight: this.containerElement.getBoundingClientRect().height
        });
    }

    containerRef(el) {
        if (el) {
            this.containerElement = el;
            this.setState({
                clientHeight: this.containerElement.getBoundingClientRect().height
            });
        }
    }

    render() {
        const {
            ...props
        } = this.props;
        return (
            <ToolContainerComponent
                height={this.state.clientHeight}
                containerRef={this.containerRef}
                {...props}
            />
        )
    }
}

ToolContainer.propTypes = {
    serialValue: PropTypes.string,
    setSerialValue: PropTypes.func
}

const mapStateToProps = state => ({
    serialValue: state.scratchGui.toolForm.serialValue
})

const mapDispatchToProps = dispatch => ({
    setSerialValue: (val) => dispatch(setSerialValue(val))
})

export default compose(injectIntl, connect(
    mapStateToProps,
    mapDispatchToProps
)
)(ToolContainer)