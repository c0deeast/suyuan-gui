import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { intlShape, injectIntl, defineMessages } from 'react-intl';
import VM from 'suyuan-vm';

import HardwareConsoleComponent from '../components/hardware-console/hardware-console.jsx';

import {
    openSerialportMenu,
    closeSerialportMenu,
    serialportMenuOpen
} from '../reducers/menus';

import { showAlertWithTimeout } from '../reducers/alerts';
import { setBaudrate, setEol, switchHexForm, switchAutoScroll, switchPause, setConsoleArray } from '../reducers/hardware-console';
import {
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

const messages = defineMessages({
    noLineTerminators: {
        defaultMessage: 'No line terminators',
        description: 'no line terminators in the end of serialsport messge to send',
        id: 'gui.hardwareConsole.noLineTerminators'
    },
    lineFeed: {
        defaultMessage: 'Line feed',
        description: 'Line feed in the end of serialsport messge to send',
        id: 'gui.hardwareConsole.lineFeed'
    },
    carriageReturn: {
        defaultMessage: 'Carriage return',
        description: 'Carriage return in the end of serialsport messge to send',
        id: 'gui.hardwareConsole.carriageReturn'
    },
    lfAndCr: {
        defaultMessage: 'LF & CR',
        description: 'LF & CR in the end of serialsport messge to send',
        id: 'gui.hardwareConsole.lfAndCr'
    }
});

const baudrateList = [
    { key: '1200', value: 1200 },
    { key: '2400', value: 2400 },
    { key: '4800', value: 4800 },
    { key: '9600', value: 9600 },
    { key: '14400', value: 14400 },
    { key: '19200', value: 19200 },
    { key: '38400', value: 38400 },
    { key: '57600', value: 57600 },
    { key: '76800', value: 76800 },
    { key: '115200', value: 115200 },
    { key: '256000', value: 256000 }
];

const eolList = [
    { key: 'null', value: messages.noLineTerminators },
    { key: 'lf', value: messages.lineFeed },
    { key: 'cr', value: messages.carriageReturn },
    { key: 'lfAndCr', value: messages.lfAndCr }
];

const MAX_CONSOLE_LENGTH = 32768;

// eslint-disable-next-line react/prefer-stateless-function
class HardwareConsole extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickClean',
            'handleClickAutoScroll',
            'handleClickHexForm',
            'handleClickPause',
            'handleClickSend',
            'handleInputChange',
            'handleKeyPress',
            'handleKeyDown',
            'handleSelectBaudrate',
            'handleSelectEol',
            'onReciveData',
            'writeToPeripheral',
            'checkIsJSON',
            'setAngle1Value',
        ]);
        this.state = {
            // consoleArray: new Uint8Array(0),
            dataToSend: ''
        };
        this._recivceBuffer = new Uint8Array(0);
    }

    componentDidMount() {
        this.props.vm.addListener('PERIPHERAL_RECIVE_DATA', this.onReciveData);
        if (this.props.peripheralName) {
            this.props.vm.setPeripheralBaudrate(this.props.deviceId, parseInt(this.props.baudrate, 10));
        }
    }

    componentWillUnmount() {
        this.props.vm.removeListener('PERIPHERAL_RECIVE_DATA', this.onReciveData);
    }

    appendBuffer(arr1, arr2) {
        const arr = new Uint8Array(arr1.byteLength + arr2.byteLength);
        arr.set(arr1, 0);
        arr.set(arr2, arr1.byteLength);
        return arr;
    }


    onReciveData(data) {
        let receiveData = this.props.isHexForm ? toHexForm(data) : new TextDecoder('utf-8').decode(data)
        console.log("执行VM监听函数:onReciveData", receiveData)
        if (data && typeof data === 'string' && this.checkIsJSON(data)) {
            let objData = JSON.parse(data)
            if (objData.type === 'reply') {
                switch (objData.act) {
                    case 'rangle':
                        this.setAngle1Value(objData.data[0])
                        this.setAngle2Value(objData.data[1])
                        this.setAngle3Value(objData.data[2])
                        this.setAngle4Value(objData.data[3])
                        this.setAngle5Value(objData.data[4])
                        this.setAngle6Value(objData.data[5])
                        break;
                    case 'record':
                        this.setCoordsXValue(objData.data[0])
                        this.setCoordsYValue(objData.data[1])
                        this.setCoordsZValue(objData.data[2])
                        this.setCoordsRXValue(objData.data[3])
                        this.setCoordsRYValue(objData.data[4])
                        this.setCoordsRZValue(objData.data[5])
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.props.isPause) {
            return;
        }

        // limit data length to MAX_CONSOLE_LENGTH
        if (this._recivceBuffer.byteLength + data.byteLength >= MAX_CONSOLE_LENGTH) {
            this._recivceBuffer = this._recivceBuffer.slice(
                this._recivceBuffer.byteLength + data.byteLength - MAX_CONSOLE_LENGTH);
        }

        this._recivceBuffer = this.appendBuffer(this._recivceBuffer, data);

        // update the display per 0.1s
        if (!this._updateTimeoutID) {
            this._updateTimeoutID = setTimeout(() => {
                // this.setState({
                //     consoleArray: this._recivceBuffer
                // });
                this.props.onSetConsoleArray(this._recivceBuffer)
                this._updateTimeoutID = null;
            }, 50);
        }
    }

    checkIsJSON(str) {
        try {
            if (typeof JSON.parse(str) === "object") {
                return true
            }
        } catch (e) {

        }

        return false
    }

    handleClickClean() {
        this._recivceBuffer = new Uint8Array(0);
        // this.setState({
        //     consoleArray: new Uint8Array(0)
        // });
        this.props.onSetConsoleArray(new Uint8Array(0))
    }

    handleClickPause() {
        this.props.onSwitchPause();
    }

    handleKeyPress(e) {
        const keyCode = e.keyCode || e.which || e.charCode;

        // User pressed enter
        if (keyCode === 13) {
            this.handleClickSend();
        }
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.which || e.charCode;
        const ctrlKey = e.ctrlKey || e.metaKey;

        // Ctrl + A
        if (keyCode === 65 && ctrlKey) {
            this.writeToPeripheral(String.fromCharCode(1));
        }
        // Ctrl + B
        if (keyCode === 66 && ctrlKey) {
            this.writeToPeripheral(String.fromCharCode(2));
        }
        // Ctrl + C
        if (keyCode === 67 && ctrlKey) {
            this.writeToPeripheral(String.fromCharCode(3));
        }
        // Ctrl + D
        if (keyCode === 68 && ctrlKey) {
            this.writeToPeripheral(String.fromCharCode(4));
        }
    }

    handleInputChange(e) {
        this.setState({
            dataToSend: e.target.value
        });
    }

    writeToPeripheral(data) {
        console.log("data:", data, typeof data)
        if (this.props.peripheralName) {
            this.props.vm.writeToPeripheral(this.props.deviceId, data);
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    handleClickSend() {
        let data = this.state.dataToSend;
        if (this.props.eol === 'lf') {
            data = `${data}\n`;
        } else if (this.props.eol === 'cr') {

            data = `${data}\r`;
        } else if (this.props.eol === 'lfAndCr') {

            data = `${data}\r\n`;
        }
        this.writeToPeripheral(data);
    }

    handleSelectBaudrate(e) {
        if (this.props.peripheralName) {
            const index = e.target.selectedIndex;
            this.props.onSetBaudrate(baudrateList[index].key);
            this.props.vm.setPeripheralBaudrate(this.props.deviceId, baudrateList[index].value);
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    handleSelectEol(e) {
        const index = e.target.selectedIndex;
        this.props.onSetEol(eolList[index].key);
    }

    handleClickHexForm() {
        this.props.onSwitchHexForm();
    }

    handleClickAutoScroll() {
        this.props.onSwitchAutoScroll();
    }

    render() {
        const {
            ...props
        } = this.props;
        return (
            <HardwareConsoleComponent
                baudrate={this.props.baudrate}
                baudrateList={baudrateList}
                consoleArray={this.props.consoleArray}
                eol={this.props.eol}
                eolList={eolList}
                isAutoScroll={this.props.isAutoScroll}
                isHexForm={this.props.isHexForm}
                isPause={this.props.isPause}
                isRtl={this.props.isRtl}
                onClickClean={this.handleClickClean}
                onClickPause={this.handleClickPause}
                onClickAutoScroll={this.handleClickAutoScroll}
                onClickHexForm={this.handleClickHexForm}
                onClickSend={this.handleClickSend}
                onClickSerialportMenu={this.props.handleClickSerialportMenu}
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyDown}
                onInputChange={this.handleInputChange}
                onRequestSerialportMenu={this.props.handleRequestSerialportMenu}
                onSelectBaudrate={this.handleSelectBaudrate}
                onSelectEol={this.handleSelectEol}
                serialportMenuOpen={serialportMenuOpen}
                {...props}
            />
        );
    }
}

HardwareConsole.propTypes = {
    baudrate: PropTypes.string.isRequired,
    deviceId: PropTypes.string.isRequired,
    eol: PropTypes.string.isRequired,
    consoleArray: PropTypes.object.isRequired,
    handleClickSerialportMenu: PropTypes.func.isRequired,
    handleRequestSerialportMenu: PropTypes.func.isRequired,
    isAutoScroll: PropTypes.bool.isRequired,
    isHexForm: PropTypes.bool.isRequired,
    isPause: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onSetBaudrate: PropTypes.func.isRequired,
    onSetEol: PropTypes.func.isRequired,
    onSwitchAutoScroll: PropTypes.func.isRequired,
    onSwitchHexForm: PropTypes.func.isRequired,
    onSwitchPause: PropTypes.func.isRequired,
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
    peripheralName: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    baudrate: state.scratchGui.hardwareConsole.baudrate,
    consoleArray: state.scratchGui.hardwareConsole.consoleArray,
    deviceId: state.scratchGui.device.deviceId,
    eol: state.scratchGui.hardwareConsole.eol,
    isAutoScroll: state.scratchGui.hardwareConsole.isAutoScroll,
    isHexForm: state.scratchGui.hardwareConsole.isHexForm,
    isPause: state.scratchGui.hardwareConsole.isPause,
    isRtl: state.locales.isRtl,
    peripheralName: state.scratchGui.connectionModal.peripheralName,
    serialportMenuOpen: serialportMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
    handleClickSerialportMenu: () => dispatch(openSerialportMenu()),
    handleRequestSerialportMenu: () => dispatch(closeSerialportMenu()),
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onSetBaudrate: baudrate => dispatch(setBaudrate(baudrate)),
    onSetEol: eol => dispatch(setEol(eol)),
    onSwitchAutoScroll: () => dispatch(switchAutoScroll()),
    onSwitchHexForm: () => dispatch(switchHexForm()),
    onSwitchPause: () => dispatch(switchPause()),
    onSetConsoleArray: (consoleArray) => dispatch(setConsoleArray(consoleArray)),
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
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HardwareConsole);
