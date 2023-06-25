import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import ToolContainerComponent from '../components/tool-container/tool-container.jsx';
import { toHexForm } from '../components/hardware-console/hardware-console.jsx';
import { showAlertWithTimeout } from '../reducers/alerts.js'
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
            'containerRef',
            'handleReadAngle',
            'handleSendAngle',
            'handleReadCoords',
            'handleSendCoords',
            'writeToPeripheral'
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
        let receiveData = this.props.isHexForm ? toHexForm(this.props.consoleArray) : new TextDecoder('utf-8').decode(this.props.consoleArray)
        console.log("receiveData:", receiveData)
        if (receiveData && typeof receiveData === 'string') {
            let _recivceData = JSON.parse(receiveData)
            if (_recivceData.type === "reply" && _recivceData.act === 'rangle' && _recivceData.data) {
                this.props.setAngle1Value(_recivceData.data[0])
                this.props.setAngle2Value(_recivceData.data[1])
                this.props.setAngle3Value(_recivceData.data[2])
                this.props.setAngle4Value(_recivceData.data[3])
                this.props.setAngle5Value(_recivceData.data[4])
                this.props.setAngle6Value(_recivceData.data[5])
            } else if (_recivceData.type === "reply" && _recivceData.act === 'rcood' && _recivceData.data) {
                this.props.setCoordsXValue(_recivceData.data[0])
                this.props.setCoordsYValue(_recivceData.data[1])
                this.props.setCoordsZValue(_recivceData.data[2])
                this.props.setCoordsRXValue(_recivceData.data[3])
                this.props.setCoordsRYValue(_recivceData.data[4])
                this.props.setCoordsRZValue(_recivceData.data[5])
            }
        }
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

    writeToPeripheral(data) {
        if (this.props.peripheralName) {
            this.props.vm.writeToPeripheral(this.props.deviceId, data);
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    handleReadAngle() {
        let data = JSON.stringify({
            type: "cmd",
            act: "rangle"
        });
        if (this.props.eol === 'lf') {
            data = `${data}\n`;
        } else if (this.props.eol === 'cr') {

            data = `${data}\r`;
        } else if (this.props.eol === 'lfAndCr') {

            data = `${data}\r\n`;
        }
        this.writeToPeripheral(data);
    }

    handleSendAngle() {
        let { angle1Value, angle2Value, angle3Value, angle4Value, angle5Value, angle6Value } = this.props
        let data = JSON.stringify({
            type: "data",
            act: "wangle",
            data: [angle1Value, angle2Value, angle3Value, angle4Value, angle5Value, angle6Value]
        });
        if (this.props.eol === 'lf') {
            data = `${data}\n`;
        } else if (this.props.eol === 'cr') {

            data = `${data}\r`;
        } else if (this.props.eol === 'lfAndCr') {

            data = `${data}\r\n`;
        }
        this.writeToPeripheral(data);
    }

    handleSendCoords() {
        let { coordsXValue, coordsYValue, coordsZValue, coordsRXValue, coordsRYValue, coordsRZValue } = this.props
        let data = JSON.stringify({
            type: "data",
            act: "wcood",
            data: [coordsXValue, coordsYValue, coordsZValue, coordsRXValue, coordsRYValue, coordsRZValue]
        })
        if (this.props.eol === 'lf') {
            data = `${data}\n`;
        } else if (this.props.eol === 'cr') {

            data = `${data}\r`;
        } else if (this.props.eol === 'lfAndCr') {

            data = `${data}\r\n`;
        }
        this.writeToPeripheral(data);
    }

    handleReadCoords() {
        let data = JSON.stringify({
            type: "cmd",
            act: "rcood"
        });
        if (this.props.eol === 'lf') {
            data = `${data}\n`;
        } else if (this.props.eol === 'cr') {

            data = `${data}\r`;
        } else if (this.props.eol === 'lfAndCr') {

            data = `${data}\r\n`;
        }
        this.writeToPeripheral(data);
    }

    render() {
        const {
            ...props
        } = this.props;
        return (
            <ToolContainerComponent
                height={this.state.clientHeight}
                containerRef={this.containerRef}
                handleReadAngle={this.handleReadAngle}
                handleReadCoords={this.handleReadCoords}
                handleSendCoords={this.handleSendCoords}
                handleSendAngle={this.handleSendCoords}
                {...props}
            />
        )
    }
}

ToolContainer.propTypes = {
    angle1Value: PropTypes.number,
    angle2Value: PropTypes.number,
    angle3Value: PropTypes.number,
    angle4Value: PropTypes.number,
    angle5Value: PropTypes.number,
    angle6Value: PropTypes.number,
    baudrate: PropTypes.string,
    baudrateValue: PropTypes.string,
    coordsXValue: PropTypes.number,
    coordsYValue: PropTypes.number,
    coordsZValue: PropTypes.number,
    coordsRXValue: PropTypes.number,
    coordsRYValue: PropTypes.number,
    coordsRZValue: PropTypes.number,
    consoleArray: PropTypes.object,
    eol: PropTypes.string,
    isHexForm: PropTypes.bool,
    serialValue: PropTypes.string,
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
    angle1Value: state.scratchGui.toolForm.formData.angle1Value,
    angle2Value: state.scratchGui.toolForm.formData.angle2Value,
    angle3Value: state.scratchGui.toolForm.formData.angle3Value,
    angle4Value: state.scratchGui.toolForm.formData.angle4Value,
    angle5Value: state.scratchGui.toolForm.formData.angle5Value,
    angle6Value: state.scratchGui.toolForm.formData.angle6Value,
    baudrate: state.scratchGui.hardwareConsole.baudrate,
    baudrateValue: state.scratchGui.toolForm.formData.baudrateValue,
    coordsXValue: state.scratchGui.toolForm.formData.coordsXValue,
    coordsYValue: state.scratchGui.toolForm.formData.coordsYValue,
    coordsZValue: state.scratchGui.toolForm.formData.coordsZValue,
    coordsRXValue: state.scratchGui.toolForm.formData.coordsRXValue,
    coordsRYValue: state.scratchGui.toolForm.formData.coordsRYValue,
    coordsRZValue: state.scratchGui.toolForm.formData.coordsRZValue,
    consoleArray: state.scratchGui.hardwareConsole.consoleArray,
    eol: state.scratchGui.hardwareConsole.eol,
    isHexForm: state.scratchGui.hardwareConsole.isHexForm,
    serialValue: state.scratchGui.toolForm.formData.serialValue,
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
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
})

export default compose(injectIntl, connect(
    mapStateToProps,
    mapDispatchToProps
)
)(ToolContainer)