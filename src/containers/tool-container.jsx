import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import ToolContainerComponent from '../components/tool-container/tool-container.jsx';
import {
    setSerialValue,
    setBaudrateValue,
    setAngle1Value,
    setAngle2Value,
    setAngle3Value,
    setAngle4Value,
    setAngle5Value,
    setAngle6Value,
    setCoordsXValue,
    setCoordsYValue,
    setCoordsZValue,
    setCoordsRXValue,
    setCoordsRYValue,
    setCoordsRZValue
} from '../reducers/tool-form.js';


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
    baudrateValue: PropTypes.string,
    angle1Value: PropTypes.string,
    angle2Value: PropTypes.string,
    angle3Value: PropTypes.string,
    angle4Value: PropTypes.string,
    angle5Value: PropTypes.string,
    angle6Value: PropTypes.string,
    coordsXValue: PropTypes.string,
    coordsYValue: PropTypes.string,
    coordsZValue: PropTypes.string,
    coordsRXValue: PropTypes.string,
    coordsRYValue: PropTypes.string,
    coordsRZValue: PropTypes.string,
    setSerialValue: PropTypes.func,
    setBaudrateValue: PropTypes.func,
    setAngle1Value: PropTypes.func,
    setAngle2Value: PropTypes.func,
    setAngle3Value: PropTypes.func,
    setAngle4Value: PropTypes.func,
    setAngle5Value: PropTypes.func,
    setAngle6Value: PropTypes.func,
    setCoordsXValue: PropTypes.func,
    setCoordsYValue: PropTypes.func,
    setCoordsZValue: PropTypes.func,
    setCoordsRXValue: PropTypes.func,
    setCoordsRYValue: PropTypes.func,
    setCoordsRZValue: PropTypes.func,
}

const mapStateToProps = state => ({
    serialValue: state.scratchGui.toolForm.serialValue,
    baudrateValue: state.scratchGui.toolForm.baudrateValue,
    angle1Value: state.scratchGui.toolForm.angle1Value,
    angle2Value: state.scratchGui.toolForm.angle1Value,
    angle3Value: state.scratchGui.toolForm.angle1Value,
    angle4Value: state.scratchGui.toolForm.angle1Value,
    angle5Value: state.scratchGui.toolForm.angle1Value,
    angle6Value: state.scratchGui.toolForm.angle1Value,
    coordsXValue: state.scratchGui.toolForm.coordsXValue,
    coordsYValue: state.scratchGui.toolForm.coordsXValue,
    coordsZValue: state.scratchGui.toolForm.coordsXValue,
    coordsRXValue: state.scratchGui.toolForm.coordsRXValue,
    coordsRYValue: state.scratchGui.toolForm.coordsRYValue,
    coordsRZValue: state.scratchGui.toolForm.coordsRZValue,
})

const mapDispatchToProps = dispatch => ({
    setSerialValue: (val) => dispatch(setSerialValue(val)),
    setBaudrateValue: (val) => dispatch(setBaudrateValue(val)),
    setAngle1Value: (val) => dispatch(setAngle1Value(val)),
    setAngle2Value: (val) => dispatch(setAngle2Value(val)),
    setAngle3Value: (val) => dispatch(setAngle3Value(val)),
    setAngle4Value: (val) => dispatch(setAngle4Value(val)),
    setAngle5Value: (val) => dispatch(setAngle5Value(val)),
    setAngle6Value: (val) => dispatch(setAngle6Value(val)),
    setCoordsXValue: (val) => dispatch(setCoordsXValue(val)),
    setCoordsYValue: (val) => dispatch(setCoordsYValue(val)),
    setCoordsZValue: (val) => dispatch(setCoordsZValue(val)),
    setCoordsRXValue: (val) => dispatch(setCoordsRXValue(val)),
    setCoordsRYValue: (val) => dispatch(setCoordsRYValue(val)),
    setCoordsRZValue: (val) => dispatch(setCoordsRZValue(val)),
})

export default compose(injectIntl, connect(
    mapStateToProps,
    mapDispatchToProps
)
)(ToolContainer)