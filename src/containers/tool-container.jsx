import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import ToolContainerComponent from '../components/tool-container/tool-container.jsx';
import { toHexForm } from '../components/hardware-console/hardware-console.jsx';
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
    /**
     * 输入数字后 会报错这一行 let _data = JSON.parse(data)代码
     * 输入空格报错 报错这一行  this.props.setSerialValue(serialValue)
     */
    componentDidMount() {
        // let data = this.props.isHexForm ? toHexForm(this.props.consoleArray) : new TextDecoder('utf-8').decode(this.props.consoleArray)
        // console.log("componentDidMountData:", data, typeof data)
        // if (data && typeof data === 'string') {
        //     let _data = JSON.parse(data)
        //     if (_data && _data.serialValue) {
        //         this.props.setSerialValue(_data.serialValue)
        //     }
        // }
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
    angle1Value: PropTypes.number,
    angle2Value: PropTypes.number,
    angle3Value: PropTypes.number,
    angle4Value: PropTypes.number,
    angle5Value: PropTypes.number,
    angle6Value: PropTypes.number,
    coordsXValue: PropTypes.number,
    coordsYValue: PropTypes.number,
    coordsZValue: PropTypes.number,
    coordsRXValue: PropTypes.number,
    coordsRYValue: PropTypes.number,
    coordsRZValue: PropTypes.number,
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
    consoleArray: PropTypes.object,
    isHexForm: PropTypes.bool,
}

const mapStateToProps = state => ({
    serialValue: state.scratchGui.toolForm.formData.serialValue,
    baudrateValue: state.scratchGui.toolForm.formData.baudrateValue,
    angle1Value: state.scratchGui.toolForm.formData.angle1Value,
    angle2Value: state.scratchGui.toolForm.formData.angle2Value,
    angle3Value: state.scratchGui.toolForm.formData.angle3Value,
    angle4Value: state.scratchGui.toolForm.formData.angle4Value,
    angle5Value: state.scratchGui.toolForm.formData.angle5Value,
    angle6Value: state.scratchGui.toolForm.formData.angle6Value,
    coordsXValue: state.scratchGui.toolForm.formData.coordsXValue,
    coordsYValue: state.scratchGui.toolForm.formData.coordsYValue,
    coordsZValue: state.scratchGui.toolForm.formData.coordsZValue,
    coordsRXValue: state.scratchGui.toolForm.formData.coordsRXValue,
    coordsRYValue: state.scratchGui.toolForm.formData.coordsRYValue,
    coordsRZValue: state.scratchGui.toolForm.formData.coordsRZValue,
    consoleArray: state.scratchGui.hardwareConsole.consoleArray,
    isHexForm: state.scratchGui.hardwareConsole.isHexForm,
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