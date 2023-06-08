import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import VM from 'suyuan-vm';

import { setStageSize } from '../reducers/stage-size';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import { openUploadProgress } from '../reducers/modals';
import { showAlertWithTimeout } from '../reducers/alerts';
import { setContainerStatus } from '../reducers/code';

import HardwareHeaderComponent from '../components/hardware-header/hardware-header.jsx';
const MAX_CONSOLE_LENGTH = 32768;
class HardwareHeader extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleUpload',
            'handleSend',
            'writeToPeripheral'
        ]);
    }

    handleUpload() {
        if (this.props.peripheralName) {
            const blocks = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocks.getBBox().height === 0) {
                this.props.onWorkspaceIsEmpty();
            } else {
                this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
                this.props.onOpenUploadProgress();
            }
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    writeToPeripheral(data) {
        if (this.props.peripheralName) {
            this.props.vm.writeToPeripheral(this.props.deviceId, data);
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    handleSend() {
        console.log("formdata",this.props.formData)
        let data = JSON.stringify(this.props.formData);
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
            <HardwareHeaderComponent
                onUpload={this.handleUpload}
                onSend={this.handleSend}
                {...props}
            />
        );
    }
}

HardwareHeader.propTypes = {
    codeEditorValue: PropTypes.string,
    deviceId: PropTypes.string,
    eol: PropTypes.string.isRequired,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    peripheralName: PropTypes.string,
    codeEditorOrToolContainer: PropTypes.string,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue,
    deviceId: state.scratchGui.device.deviceId,
    eol: state.scratchGui.hardwareConsole.eol,
    peripheralName: state.scratchGui.connectionModal.peripheralName,
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    codeEditorOrToolContainer: state.scratchGui.code.codeEditorOrToolContainer,
    formData: state.scratchGui.toolForm.formData
});

const mapDispatchToProps = dispatch => ({
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onSetStageHide: () => dispatch(setStageSize(STAGE_SIZE_MODES.hide)),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty'),
    onSetContainerStatus: (value) => dispatch(setContainerStatus(value))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HardwareHeader);
